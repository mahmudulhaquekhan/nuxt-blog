<script setup lang="ts">

</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-100 hidden md:flex flex-col">
      <div class="h-16 flex items-center justify-center border-b border-gray-300">
        <NuxtLink href="/" class="text-xl font-bold">Logo</NuxtLink>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink 
            v-for="link in [
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Blogs', path: '/dashboard/blogs' }
            ]"
            :href="link.path" class="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            :class="{ 'bg-gray-200! pointer-events-none': $route.path === link.path }"
            :disabled="$route.path === link.path"
        >
            {{ link.name }}
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-300">
        <button class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-4">
        <button class="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <!-- Mobile menu button -->
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold">Dashboard</h1>
        <div class="flex items-center gap-4">
          <input type="text" placeholder="Search..."
            class="hidden md:block border rounded-lg px-3 py-1.5 text-sm" />
          <img src="https://via.placeholder.com/32" alt="user"
            class="w-8 h-8 rounded-full border" />
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot/>
      </main>
    </div>
  </div>
</template>
