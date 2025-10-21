<script setup lang="ts">

useHead({
    title: 'Blogs',
});

interface Post {
    id: number
    title: string
    subtitle: string
    created_at: string
    author: string
    image_url: string | null
    comments_count: number
}

const { data, error, pending } = await useFetch<{
    featured: Post;
    posts: Post[];
}>('/api/frontend/home/posts');


</script>

<template>
    <p v-if="pending">Loading posts...</p>
    <section v-if="data?.posts?.length" class="py-10 p-2">
        <div class="mx-auto container">
            <h2 class="text-4xl font-bold text-gray-900">
                Blogs
            </h2>
            <p class="text-lg max-w-2xl leading-tight mb-8 pt-6">
                Explore our latest articles, insights, and stories on a variety of topics. Stay informed and inspired
                with
                fresh content updated regularly.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="post in data.posts" :key="post.id" :to="`/blogs/blog/${post.id}`"
                    class="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                    <div>
                        <img v-if="post.image_url" :src="post.image_url" alt="Post image"
                            class="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div class="p-5">
                        <p class="text-sm text-gray-500 mb-1">
                            {{
                                new Date(post.created_at).toLocaleDateString('en-UK', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                            })
                            }}
                            <span class="text-gray-400"> • </span> 10 Mins Read
                        </p>

                        <h4 class="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {{ post.title }}
                        </h4>
                        <p class="text-md text-gray-600 mb-4">{{ post.subtitle }}</p>

                        <div class="flex items-center gap-2 mt-4">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold capitalize">
                                {{ post.author[0] }}
                            </div>
                            <span class="text-sm font-medium text-gray-700">{{ post.author }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>

    <p v-else-if="!pending && !data?.posts?.length">
        No posts found.
    </p>

</template>
