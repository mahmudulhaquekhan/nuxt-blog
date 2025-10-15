<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useModal from '~/composables/ui/modal/modal';
import Modal from '../ui/modal/Modal.vue';


const modal = useModal({ id: 'ProfilePictureModal' });
const processing = ref(false);

const session = useUserSession();



interface UserProfile {
    name: string;
    email: string;
    profile_picture: string | null;
}

interface FormErrors {
  name?: string | null;
  email?: string | null;
}

watch(() => modal.status.value, (isOpen) => {
  if (isOpen && user.value) {
    form.value.name = user.value.name;
    form.value.email = user.value.email;
  }
});

const user = computed<UserProfile | null>(() => session.user.value as UserProfile || null);

const uploadedFile = ref<File | null>(null);
const form = ref({ name: '', email: '' });

const ProfilePictureUpdate = async () => {
    if (!uploadedFile.value) return
    processing.value = true;

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('profile_picture', uploadedFile.value);

    await $fetch(`/api/user/profileUpdate`, {
        method: 'POST',
        body: formData,
    })
        .then(async () => {
            await session.fetch();
            modal.close();
            navigateTo({ path: '/profile' });
        })
        .catch((err: any) => {
            const errorData = err?.data?.data ?? null;
        })
        .finally(() => {
            processing.value = false;
        });
};

</script>


<template>
    <Modal :show="modal.status.value" @close="modal.close()" title="Update Profile Picture">
        <form @submit.prevent="ProfilePictureUpdate">
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
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" v-model="form.name" :placeholder="user?.name || 'Enter your name'"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" />
                <!-- <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p> -->
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" v-model="form.email"
                    :placeholder="user?.email || 'Enter your name'"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" />
                <!-- <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p> -->
            </div>

            <div class="flex gap-6 items-center justify-center">
                <button class="border px-4 py-2 rounded hover:text-blue-600 transition" @click="modal.close()">
                    Cancle
                </button>
                <button type="submit"
                    class="bg-green-500 text-white flex items-center gap-1 px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="processing">
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                </button>
            </div>
        </form>
    </Modal>
</template>
