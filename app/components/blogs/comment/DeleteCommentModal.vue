<script setup lang="ts">
import { ref } from 'vue';
import Modal from '~/components/ui/modal/Modal.vue';
import useModal from '~/composables/ui/modal/modal';

const CommentId = computed<number>(() => modal.getData());

const modal = useModal({
    id: 'DeleteCommentModal',
})

const route = useRoute()

const processing = ref(false);

const deleteComment = async () => {
    processing.value = true;

    await $fetch(`/api/blog/comment/${CommentId.value}`, {
        method: 'DELETE',
    })
    .then(() => {
        modal.close();
        refreshNuxtData();
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
        title="Delete Comment"
    >
        <div class="flex gap-6 items-center justify-center">
            <button class="border px-4 py-2 rounded hover:text-blue-600 transition" @click="modal.close()">
                Cancle
            </button>
            <button @click="deleteComment" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition" :disabled="processing">
                Delete
            </button>
        </div>
    </Modal>
</template>

