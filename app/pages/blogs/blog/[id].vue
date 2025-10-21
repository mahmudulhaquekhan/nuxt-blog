<script setup lang="ts">
import { ref } from 'vue'
import AddCommentModal from '~/components/blogs/comment/AddCommentModal.vue'
import DeleteCommentModal from '~/components/blogs/comment/DeleteCommentModal.vue'
import useModal from '~/composables/ui/modal/modal'

const route = useRoute()

interface Comment {
    id: number
    post_id: number
    name: string
    email: string
    description: string
    created_at: string
    updated_at: string
}

interface Post {
    id: number
    title: string
    description: string
    created_at: string
    author: string
    image_url: string | null
    comments: Comment[]
}
const processing = ref(false)

const { user, loggedIn } = useUserSession();

const { data, pending, error } = await useFetch<Post>(`/api/frontend/home/posts/${route.params.id}`)

const DeleteModal = useModal({
    id: 'DeleteCommentModal',
})

const addComment = useModal({
    id: 'AddCommentModal',
})

</script>

<template>
    <section class="container mx-auto p-6">
        <p v-if="pending">Loading post...</p>

        <div v-else-if="data" class="pb-20 bg-amber-50">
            <div v-if="data.image_url" class="relative w-full overflow-hidden">
                <img :src="data.image_url" alt="Post image" class="w-full h-160 object-cover rounded-lg" />
                <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            </div>

            <div class="max-w-4xl mx-auto px-6 mt-4 bg-white rounded-2xl shadow-sm p-4">
                <h1 class="text-3xl font-semibold mb-3 leading-tight">
                    Title: {{ data.title }}
                </h1>
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 border-b border-gray-100 pb-6 mb-8">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-semibold capitalize">
                            {{ data.author[0] }}
                        </div>
                        <div>
                            <p class="font-medium text-gray-900">{{ data.author }}</p>
                            <p class="text-sm text-gray-500">
                                {{
                                    new Date(data.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })
                                }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                    <p class="whitespace-pre-line">
                        {{ data.description }}
                    </p>
                </div>
                <div v-if="loggedIn" class="flex justify-end items-center w-full">
                    <button class="bg-green-500 text-white gap-1 px-4 py-2 mt-2 rounded hover:bg-green-600 transition"
                        @click="addComment.show(data.id)">
                        Add Comment
                    </button>
                </div>
            </div>
            
            <div v-if="data.comments && data.comments.length"
                class="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-black mb-6">
                    Comments ({{ data.comments.length }})
                </h3>

                <div class="space-y-3 max-w-lg mx-auto">
                    <div v-for="comment in data.comments" :key="comment.id"
                        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                                {{ comment.name.charAt(0).toUpperCase() }}
                            </div>

                            <div class="flex-1">
                                <div class="flex justify-between items-center">
                                    <p class="font-medium">{{ comment.name }}</p>

                                    <button v-if="loggedIn"
                                        class="bg-red-600 text-white px-2 py-2 rounded-full hover:bg-red-500 transition"
                                        @click="DeleteModal.show(comment.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                            height="18" fill="none" stroke="currentColor" stroke-width="1.8"
                                            stroke-linecap="round" stroke-linejoin="round">
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
            </div>
        </div>

        <div v-else-if="error" class="text-center py-10">
            Failed to load post details.
        </div>
    </section>

    <AddCommentModal @created="() => refreshNuxtData()" />

    <DeleteCommentModal />
</template>
