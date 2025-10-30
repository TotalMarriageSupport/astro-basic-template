import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Demo persistence for likes (in-memory). Replace with DB in production.
const likeCountByPostId = new Map<string, number>();

export const server = {
    like: defineAction({
        input: z.object({
            postId: z.string().min(1)
        }),
        handler: async ({ postId }: { postId: string }) => {
            const current = likeCountByPostId.get(postId) ?? 0;
            const next = current + 1;
            likeCountByPostId.set(postId, next);
            return { likes: next };
        }
    })
};

