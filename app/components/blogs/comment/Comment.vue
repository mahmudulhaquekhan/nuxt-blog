<script setup lang="ts">
import useModal from '~/composables/ui/modal/modal'


const props = defineProps<{
    postId: number,
}>()


interface Comment {
    id: number
    name: string
    email: string
    description: string
}

const { data: comments, error, pending } = await useFetch<{
    data: Comment[],
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    },
    meta: {
        current_page: number
        from: number
        last_page: number
        links: Array<{ url: string | null; label: string; active: boolean }>
    },
    path: string,
    per_page: number,
    to: number | null,
    total: number
}>(`/api/blog/${props.postId}/comment/comment`);

const DeleteModal = useModal({
  id: 'DeleteCommentModal',
})
</script>

<template>
    <template v-if="comments && comments.data.length">
        <section class="w-full">
            <h3 class="text-lg font-semibold text-black mb-6">
                Comments ({{ comments.data.length }})
            </h3>

            <div class="space-y-3">
                <div v-for="comment in comments.data" :key="comment.id"
                    class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div class="flex items-start gap-4">
                        <div
                            class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                            {{ comment.name.charAt(0).toUpperCase() }}
                        </div>

                        <div class="flex-1">
                            <div class="flex justify-between items-center">
                                <p class="font-medium">
                                    {{ comment.name }}
                                </p>
                                <button class="bg-red-600 text-white px-2 py-2 rounded-full hover:bg-red-500 transition"
                                    @click="DeleteModal.show(comment.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"
                                        fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                        stroke-linejoin="round" aria-hidden="false" role="img" aria-label="Delete">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                </button>
                            </div>
                            <p class="mt-2 leading-relaxed">
                                {{ comment.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>

    <template v-else>
        <p class="text-gray-500 text-sm mt-4">No comments yet. Be the first to comment!</p>
    </template>
</template>