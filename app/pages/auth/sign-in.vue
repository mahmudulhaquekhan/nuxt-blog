<script setup lang="ts">
import { reactive } from 'vue'

const { loggedIn, user, fetch: refreshSession } = useUserSession();

const credentials = reactive({
  email: '',
  password: '',
})

const errors = reactive<{
  email?: string, 
  password?: string, 
}>({
  password: '',
  email: '',
})


const loading = ref(false);

async function login() {
  loading.value = true;

  $fetch('/api/auth/login', {
    method: 'POST',
    body: credentials
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch((error: any) => {
      // Handle errors from the server

      if (error?.data?.data) {
        
        const errorData = error.data.data as Record<string, string[]>

        Object.keys(errors).forEach((key: string) => {

          const error = (errorData[key] ?? []) as string[] ;

          errors[key as keyof typeof errors] = error[0] ?? ''
        })
      } else {
        alert('An unexpected error occurred')
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div class="bg-gray-900 h-screen">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
            <div class="mt-2">
              <input type="email" name="email" id="email" autocomplete="email" v-model="credentials.email"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input type="password" name="password" id="password" autocomplete="current-password"
                v-model="credentials.password"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
            </div>
          </div>

          <div>
            <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
            :disabled="loading"  
          >

            <span
              v-if="!loading"
            >
              Sign In
            </span>
            <span v-else class="inline-flex items-center">
              <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Loading
            </span>
          </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?
          <NuxtLink to="/auth/sign-up" class="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign Up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>