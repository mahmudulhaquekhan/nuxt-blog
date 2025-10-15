<script setup lang="ts">
import { ref } from 'vue';
import useModal from '~/composables/ui/modal/modal';
import Modal from '../ui/modal/Modal.vue';


const modal = useModal({
    id: 'CreateBlogModal',
})

const emit = defineEmits<{
    created: []
}>()

const form = ref({
    title: '',
    description: ''
});

const uploadedFile = ref<File | null>(null);

const errors = ref({
    title: null as string | null,
    description: null as string | null,
});

const processing = ref(false);

const submitForm = async () => {
    if (!uploadedFile.value) return
    processing.value = true;

    errors.value = {
        title: null,
        description: null,
    };

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('image', uploadedFile.value);

    await $fetch('/api/blog/posts', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        modal.close();
        form.value = {
            title: '',
            description: '',
        };
        emit('created');

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
};

</script>

<template>
    <Modal
        :show="modal.status.value"
        @close="modal.close()"
        title="Create New Blog Post"
    >
        <form
            @submit.prevent="submitForm"
            method="post"
            class="space-y-4"
        >   
            <UFileUpload
                v-model="uploadedFile"
                layout="list"
                position="inside"
                accept="image/*"
                label="Drop your image here"
                description="SVG, PNG, JPG or GIF (max. 2MB)"
                class="w-96"
                :ui="{ base: 'min-h-48' }"
            />
            <div>
                <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                >Title</label> 
                <input
                    type="text"
                    id="title"
                    name="title"
                    class="p-2 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500"
                    v-model="form.title"
                />

                <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
            </div>

            <div>
                <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                >Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
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
                    Create Post
                </button>
            </div>
        </form>
    </Modal>
</template>

