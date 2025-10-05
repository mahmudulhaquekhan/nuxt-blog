<script setup lang="ts">
import { ref } from 'vue';
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

</script>

<template>
    <div v-if="pending" class="flex justify-center items-center h-screen">
        Loding...
    </div>
    <div v-else-if="post">
        <h1 class="text-3xl font-bold mb-4">Edit Blog Post</h1>
        <form @submit.prevent="updatePost">
            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" v-model="post.title"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:ring focus:ring-opacity-50 p-2" />
                <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" v-model="post.description"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-lg focus:ring focus:ring-opacity-50 p-2"
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
</template>