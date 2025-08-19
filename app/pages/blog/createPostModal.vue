<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  showModal: boolean
}>()

const emit = defineEmits(['close', 'addPost'])

const newPost = ref<{ title: string; description: string }>({ title: '', description: '' })

watch(() => props.showModal, (newVal) => {
  if (newVal) {
    newPost.value = { title: '', description: '' }
  }
})

const addPost = () => {
  const { title, description } = newPost.value
  if (!title.trim() || !description.trim()) {
    alert('Both title and description are required.')
    return
  }

  emit('addPost', newPost.value)

}
</script>

<template>
  <div v-if="props.showModal" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 class="text-2xl font-semibold mb-4">Add New Post</h3>

      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input v-model="newPost.title" type="text" class="w-full mt-2 p-2 border rounded-md" placeholder="Enter post title">
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="newPost.description" rows="4" class="w-full mt-2 p-2 border rounded-md" placeholder="Enter post description"></textarea>
      </div>

      <div class="mt-4 flex justify-end gap-4">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-400 hover:bg-gray-300 text-white rounded-lg">Cancel</button>
        <button @click="addPost"  class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg">Add Post</button>
      </div>
    </div>
  </div>
</template>