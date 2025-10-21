<script setup lang="ts">
import { ref } from 'vue'
import useModal from '~/composables/ui/modal/modal'
import Modal from '../ui/modal/Modal.vue'

const modal = useModal({
    id: 'PostDetailsModal',
})

const props = defineProps<{
    post: {
        id: number
        title: string
        subtitle: string
        created_at: string
        author: string
        image_url: string | null
        comments_count: number
    } | null
}>()

interface Post {
    id: number
    title: string
    description: string
    created_at: string
    author: string
    image_url: string | null
}

const { data, error, pending } = await useFetch<{
    posts: Post[];
}>('/api/frontend/home/posts');

const processing = ref(false)
</script>

<template>
    <Modal :show="modal.status.value" @close="modal.close()" title="Post Details">
        <template #default>
            <div v-if="props.post" class="space-y-6">
                <img v-if="props.post.image_url" :src="props.post.image_url" alt="Post image"
                    class="rounded-2xl w-full object-cover shadow-md" />

                <h2 class="text-2xl font-bold text-gray-900 leading-snug">
                    {{ props.post.title }}
                </h2>

                <p class="text-gray-600 text-base leading-relaxed">
                    {{ props.post.subtitle }}
                </p>

                <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-gray-700">
                            By {{ props.post.author }}
                        </span>
                    </div>
                    <span class="text-sm text-gray-500">
                        {{
                            new Date(props.post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                        })
                        }}
                    </span>
                </div>
            </div>

            <div v-else class="text-gray-500 text-center py-10">
                No post details available.
            </div>
        </template>
    </Modal>
</template>
