import { actions } from 'astro:actions';
import { withState } from '@astrojs/react/actions';
import { useActionState } from 'react';

type LikeButtonProps = {
    postId: string;
    initialLikes?: number;
};

export default function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
    const [state, formAction, pending] = useActionState(
        withState(actions.like),
        { data: { likes: initialLikes }, error: undefined }
    );

    return (
        <form action={formAction}>
            <input type="hidden" name="postId" value={postId} />
            <button type="submit" disabled={pending}>
                {state?.data?.likes ?? initialLikes} ❤️ {pending ? '…' : ''}
            </button>
        </form>
    );
}


