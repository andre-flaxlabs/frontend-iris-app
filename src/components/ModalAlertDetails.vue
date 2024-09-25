<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const closeModalAlertDetails = () => {
  emit('close')
}
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="relative bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-2xl md:py-14 md:px-16"
    >
      <!-- Added 'relative' here -->
      <div class="flex justify-between items-start pb-2">
        <div class="text-center w-full">
          <span class="inline-block mx-auto mb-3">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect opacity="0.1" width="60" height="60" rx="30" fill="#7c3aed"></rect>
              <path
                d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                stroke="#7c3aed"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>

          <h3 class="mt-3 pb-2 text-xl font-semibold text-black dark:text-white sm:text-2xl">
            Details of Alerts
          </h3>
          <span
            class="mx-auto mb-6 inline-block h-1 w-23 rounded bg-violet-600 text-white dark:text-gray-800"
          >
            ---------
          </span>
        </div>
        <button
          @click="closeModalAlertDetails"
          class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>

  <!-- <div class="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5" style="">
        <div class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
            <span class="mx-auto inline-block">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.1" width="60" height="60" rx="30" fill="#DC2626"></rect>
                    <path d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            <h3 class="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl"> 
                Deactivate Your Account 
            </h3>
            <p class="mb-10 font-medium"> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum been. 
            </p>
            <div class="-mx-3 flex flex-wrap gap-y-4">
                <div class="w-full px-3 2xsm:w-1/2">
                    <button class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"> 
                        Cancel 
                    </button>
                </div>
            <div class="w-full px-3 2xsm:w-1/2">
                <button class="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"> 
                Deactivate 
                </button>
            </div>
            </div>
        </div>
    </div> -->
  <!-- <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-100">
        <button @click="closeModal" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          ✕
        </button>
        
        <div class="text-center">
            <h3 class="pb-2 text-xl font-semibold text-black dark:text-white sm:text-2xl">Details of Alerts</h3>
            <span class="mx-auto mb-6 inline-block h-1 w-23 rounded bg-violet-600 text-white dark:text-gray-800"> ---------  </span>
        </div>
      <div class="flex justify-between items-center pb-3">
        
        
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
</div> -->
</template>
