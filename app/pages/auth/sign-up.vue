<script setup lang="ts">
import { reactive } from 'vue'
import { useUserSession } from '#imports'

const { fetch: refreshSession } = useUserSession();

const userInfo = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})


async function addUser() {
  if (userInfo.password !== userInfo.password_confirmation) {
    alert('Passwords do not match')
    return
  }

  $fetch('/api/auth/signup', {
    method: 'POST',
    body: userInfo
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch((error: any) => alert(error?.data?.message || 'Signup failed'))
}
</script>

<template>
  <div class="bg-gray-900 h-screen">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create a New Account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" @submit.prevent="addUser">
          <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-100">Name</label>
            <input type="text" id="name" v-model="userInfo.name" required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white" />
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
            <input type="email" id="email" v-model="userInfo.email" required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white" />
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            <input type="password" id="password" v-model="userInfo.password" required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white" />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="userInfo.password_confirmation" required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white" />
          </div>

          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white">
            Sign Up
          </button>

          <p class="mt-10 text-center text-sm/6 text-gray-400">
            Already have a account?
            <NuxtLink to="/auth/sign-in" class="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign In
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
