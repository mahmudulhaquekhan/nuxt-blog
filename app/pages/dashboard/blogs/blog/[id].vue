<script setup lang="ts">
import { ref } from 'vue';
import DeleteModal from '~/components/blogs/DeleteModal.vue';

import useModal from '~/composables/ui/modal/modal';

useHead({
    title: 'Dashboard - Edit Blog',
});

const route = useRoute()

interface Post {
    id: number
    title: string
    description: string
}

const { data: post, error, pending } = await useFetch<Post>(`/api/blog/${route.params.id}`);

const errors = ref({
    title: null as string | null,
    description: null as string | null,
});
const processing = ref(false);

async function updatePost() {
    await $fetch(`/api/blog/${route.params.id}`, {
        method: 'PUT',
        body: {
            title: post.value?.title,
            description: post.value?.description
        },
    })
    .then(() => {

        navigateTo({ path: '/dashboard/blogs' })

    })
    .catch((error) => {
        const errorData = error.data.data ?? null;

        if(errorData) {
            errors.value = {
                title: errorData.title ? errorData.title[0] : null,
                description: errorData.description ? errorData.description[0] : null,
            }
        }
    })
    .finally(() => {
        processing.value = false;
    });
}

const DeletePostModal = useModal({
  id: 'DeletePostModal',
})

</script>

<template>
    <div v-if="pending" class="flex justify-center items-center h-screen">
        Loding...
    </div>
    <div v-else-if="post">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold mb-4">Edit Blog Post</h1>
            <button 
                class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                @click="DeletePostModal.show()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="false" role="img" aria-label="Delete">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                </svg>
            </button>
        </div>
        <form @submit.prevent="updatePost">
            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" v-model="post.title"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" />
                <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" v-model="post.description"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
                    rows="4"></textarea>
                <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
            </div>
            <div class="flex justify-end">
                <button 
                    type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="processing"
                >
                    Update Post
                </button>
            </div>
        </form>
    </div>
    <DeleteModal />
</template>