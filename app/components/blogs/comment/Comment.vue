<script setup lang="ts">

const props = defineProps<{
    postId: number
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
</script>

<template>
    <template
        v-if="comments && comments.data.length"
    >
        <h3 class="text-md font-medium">Comments </h3>
        <div v-for="comment in comments.data" :key="comment.id" class="mt-6 ">
            <div>
                <div class=" py-4">
                    <p class="">{{ comment.name }} ({{ comment.email }})</p>
                    <p class="mt-1">{{ comment.description }}</p>
                </div>
            </div>
        </div>
    </template>
    
</template>