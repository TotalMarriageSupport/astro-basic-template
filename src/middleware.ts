import { defineMiddleware, sequence } from 'astro:middleware';

const ipRestriction = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (pathname === '/health' || pathname === '/health/') {
    return next();
  }

  const rawAllowedIps = import.meta.env.ALLOWED_IPS;

  if (!rawAllowedIps) {
    return next();
  }

  const allowedIps = rawAllowedIps
    .split(/[\s,]+/)
    .map((ip: string) => ip.trim())
    .filter(Boolean);

  if (allowedIps.length === 0) {
    return next();
  }

  const forwardedFor = context.request.headers.get('x-forwarded-for');
  const clientIp =
    forwardedFor?.split(',')[0]?.trim() ?? context.clientAddress ?? '';

  if (clientIp && allowedIps.includes(clientIp)) {
    return next();
  }

  console.warn(`[middleware] Blocked request from ${clientIp || 'unknown IP'}`);
  return new Response('Forbidden', { status: 403 });
});

const authGuard = defineMiddleware(async (context, next) => {
  console.log(
    '[middleware] onRequest:',
    context.request.method,
    context.url.pathname
  );

  return next();
});

export const onRequest = sequence(ipRestriction, authGuard);
