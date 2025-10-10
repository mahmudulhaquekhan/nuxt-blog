<script setup lang="ts">

interface Comment {
  id: number
  name: string
  email: string
  description: string
}

const { data: comments, error, pending } = await useFetch<Comment>('/api/blog/comment')
</script>

<template>
    <div v-if="comments" v-for="comment in comment.data" :key="comment.id" class="mt-6 ">
        <h3 class="text-md font-medium">Comments </h3>
        <div>
            <div class=" py-4">
                <p class="">{{ comment.name }} ({{ comment.email }})</p>
                <p class="mt-1">{{ comment.description }}</p>
            </div>
        </div>
    </div>
</template>