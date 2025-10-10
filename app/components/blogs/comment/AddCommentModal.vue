<script setup lang="ts">
import { ref } from 'vue';
import Modal from '~/components/ui/modal/Modal.vue';
import useModal from '~/composables/ui/modal/modal';

const modal = useModal({
    id: 'AddCommentModal',
})

const emit = defineEmits<{
    created: []
}>()

const form = ref({
    name: '',
    email: '',
    description: ''
});

const errors = ref({
    name: null as string | null,
    email: null as string | null,
    description: null as string | null,
});

const processing = ref(false);

const submitForm = async () => {
    processing.value = true;

    errors.value = {
        name: null,
        email: null,
        description: null
    };

    await $fetch('/api/blog/comment/comment', {
        method: 'POST',
        body: form.value
    })
    .then(() => {
        modal.close();
        form.value = {
            name: '',
            email: '',
            description: ''
        };
        
        emit('created');

    })
    .catch((error) => {
        const errorData = error.data.data ?? null;

        if(errorData) {
            errors.value = {
                name: errorData.name ? errorData.name[0] : null,
                email: errorData.email ? errorData.email[0] : null,
                description: errorData.description ? errorData.description[0] : null,
            }
        }
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
        title="Post a Comment"
    >
        <form
            @submit.prevent="submitForm"
            method="post"
            class="space-y-4"
        >
            <div>
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                >Name</label> 
                <input
                    type="text"
                    id="name"
                    name="name"
                    class="p-2 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500"
                    v-model="form.name"
                />

                <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
            </div>

            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                >Email</label> 
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="p-2 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500"
                    v-model="form.email"
                />

                <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
            </div>

            <div>
                <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                >Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="2"
                    class="p-2 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500"
                    v-model="form.description"
                ></textarea>
                <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
            </div>

            <div class="text-right">
                <button
                    :disabled="processing"
                    type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Post Comment
                </button>
            </div>
        </form>
    </Modal>
</template>

