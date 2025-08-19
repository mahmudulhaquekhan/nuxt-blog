<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);

const { user, loggedIn } = useUserSession();

// Dummy profile image
const profileImg = 'https://i.pravatar.cc/32?img=1';

const showDropdown = ref(false);

function logout() {

    $fetch('/api/auth/logout', {
        method: 'POST'
    })
    .then(() => {
        // Clear the session and redirect to the login page
        useUserSession().clear();
        navigateTo('/auth/sign-in');
    })
    .catch(() => alert('Logout failed'));

    showDropdown.value = false;
}

</script>

<template>
    <nav class="bg-white border-b border-gray-200 px-4 py-3 md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-between">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-800">NuxtBlog</NuxtLink>
            <button
                class="md:hidden text-gray-700 focus:outline-none"
                @click="open = !open"
                aria-label="Toggle menu"
            >
                <svg v-if="!open" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div
            :class="[
                open ? 'block' : 'hidden',
                'md:flex md:items-center w-full md:w-auto mt-3 md:mt-0'
            ]"
        >
            <NuxtLink
                to="/"
                class="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 md:mx-2"
                active-class="font-semibold text-blue-600"
                exact
            >Home</NuxtLink>
            <NuxtLink
                to="/blog/blogs"
                class="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 md:mx-2"
                active-class="font-semibold text-blue-600"
            >Blog</NuxtLink>
            <NuxtLink
                to="/about"
                class="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 md:mx-2"
                active-class="font-semibold text-blue-600"
            >About</NuxtLink>

            <template v-if="!loggedIn">
                <NuxtLink
                    to="/auth/sign-in"
                    class="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 md:mx-2"
                    active-class="font-semibold text-blue-600"
                >Login</NuxtLink>
            </template>
            <template v-else>
                <div class="relative md:mx-2">
                    <button
                        class="flex items-center focus:outline-none"
                        @click="showDropdown = !showDropdown"
                        aria-label="Profile menu"
                    >
                        <img :src="profileImg" alt="Profile" class="w-8 h-8 rounded-full border" />
                        <svg class="w-4 h-4 ml-1 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div
                        v-if="showDropdown"
                        class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                    >
                        <button
                            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            @click="logout"
                        >Logout</button>
                    </div>
                </div>
            </template>
        </div>
    </nav>
    <main>
        <slot />
    </main>
</template>
