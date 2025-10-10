<script setup lang="ts">
import { ref } from 'vue';
import useModal from '~/composables/ui/modal/modal';
import Modal from '../ui/modal/Modal.vue';


const modal = useModal({
    id: 'DeletePostModal',
})

const route = useRoute()

const processing = ref(false);

const deletePost = async () => {
    processing.value = true;

    await $fetch(`/api/blog/${route.params.id}`, {
        method: 'DELETE',
    })
    .then(() => {
        modal.close();
        navigateTo({ path: '/dashboard/blogs' })

    })
    .catch((error) => {
        const errorData = error.data.data ?? null;   
    })
    .finally(() => {
        processing.value = false;
    });
};

</script>

<template>
    <Modal
        :show="modal.status.value"
        @close="modal.close()"
        title="Delete Post"
    >
        <div class="flex gap-6 items-center justify-center">
            <button class="border px-4 py-2 rounded hover:text-blue-600 transition" @click="modal.close()">
                Cancle
            </button>
            <button @click="deletePost" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition" :disabled="processing">
                Delete
            </button>
        </div>
    </Modal>
</template>

