<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  id: number
  title: string
  description: string
}

const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const res = await $fetch<Post[]>('/api/posts')
    posts.value = res
  } catch (err) {
    console.error('Failed to load posts', err)
  }
})

console.log(posts)
</script>

<template>
  <div class="bg-gray-900 min-h-screen py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">From the blog</h2>
        <p class="mt-2 text-lg/8 text-gray-300">Learn how to grow your business with our expert advice.</p>
      </div>

      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="flex max-w-xl flex-col items-start justify-between"
        >
          <div class="group relative grow">
            <h3 class="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
              {{ post.title }}
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-400">{{ post.description }}</p>
          </div>

          <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
            <div class="text-sm/6">
              <p class="font-semibold text-white">You</p>
              <p class="text-gray-400">Author</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>