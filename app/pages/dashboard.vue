<script setup lang="ts">

useHead({
  title: 'Dashboard - Home',
});

definePageMeta({
  layout: false
});

</script>

<template>
    <NuxtLayout name="dashboard-default">
        <NuxtPage/>
    </NuxtLayout>
</template>