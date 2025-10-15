<script setup lang="ts">
import { NuxtLink } from '#components'
import { ref } from 'vue'
import AddCommentModal from '~/components/blogs/comment/AddCommentModal.vue';
import CreateBlogModal from '~/components/blogs/CreateBlogModal.vue';
import useModal from '~/composables/ui/modal/modal';
import Comment from '~/components/blogs/comment/Comment.vue';
import DeleteCommentModal from '~/components/blogs/comment/DeleteCommentModal.vue';

useHead({
    title: 'Dashboard - Blogs',
});

interface Post {
    id: number
    title: string
    description: string
    image: string | null
    created_at: string
}

interface ApiResponse {
    data: Post[]
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
}

const { data: posts, error, pending, refresh } = await useFetch<ApiResponse>('/api/blog/posts');


const createBlogModal = useModal({
    id: 'CreateBlogModal',
})

const addComment = useModal({
    id: 'AddCommentModal',
})
</script>

<template>
    <div class="text-end">
        <button class="mb-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" @click="createBlogModal.show()">
            + Create New Post
        </button>
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">

        <p v-if="pending">Loading posts...</p>

        <article v-else-if="posts" v-for="post in posts.data" :key="post.id"
            class="flex max-w-xl flex-col items-start border border-gray-200 p-4 rounded-lg shadow-sm">
            <div class="flex justify-between">
                <h3 class="text-lg font-semibold text-gray-900 w-auto">
                    {{ post.title }}
                </h3>
                <NuxtLink :to="`/dashboard/blogs/blog/${post.id}`">
                    <button class="ml-4">
                        <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <rect width="100" height="100" fill="url(#pattern0_1_2)" />
                            <defs>
                                <pattern id="pattern0_1_2" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1_2" transform="scale(0.01)" />
                                </pattern>
                                <image id="image0_1_2" width="100" height="100" preserveAspectRatio="none"
                                    xlink:href="data:image/png;base64,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" />
                            </defs>
                        </svg>
                    </button>
                </NuxtLink>
            </div>
            <p class="mt-2 mb-4 line-clamp-3 text-sm text-gray-700">
                {{ post.description }}
            </p>
            <img v-if="post.image" :src="post.image" alt="Post Image" class="w-full" />
            <div class="flex justify-end items-center w-full">
                <button
                    class="bg-green-500 text-white gap-1 px-4 py-2 mt-2 rounded hover:bg-green-600 transition" @click="addComment.show(post.id)">
                    Add Comment
                </button>
            </div>
            <Comment :post-id="post.id" />
        </article>
    </div>

    <CreateBlogModal @created="() => refreshNuxtData()" />

    <AddCommentModal @created="() => refreshNuxtData()" />

    <DeleteCommentModal />
</template>
