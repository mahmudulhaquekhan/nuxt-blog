<script lang="ts" setup>

const props = withDefaults(defineProps<{
  show: boolean,
  title?: string | null
}>(), {
  title: null
})

const emit = defineEmits<{
  close: []
}>()

</script>

<template>

    <transition 
        name="fade"
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div 
            v-if="show" 
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            @click.self="emit('close')"
        >
            <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md">

                <div
                    class="flex items-center justify-between p-3 px-4"
                >

                    <h4 class="text-lg font-semibold text-gray-800">
                        {{ title }}
                    </h4>

                    <button 
                        class="text-gray-600 hover:text-gray-800"
                        @click="emit('close')"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-4">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>