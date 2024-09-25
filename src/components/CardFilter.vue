<!-- src/components/CardFilter.vue -->
<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const emits = defineEmits(['card-selected']);
const props = defineProps({
  cardFilterBrand: {
    type: Array as () => Array<{ image: string; title: string; alerts: number; value: string }>,
    required: true,
  },
  selectedCard: {
    type: String,
    default: null,
  },
});

function selectCard(value: string) {
  emits('card-selected', value);
}
</script>

<template>
  
    <div v-for="(item, index) in cardFilterBrand" :key="index" @click="selectCard(item.value)"
         :class="['block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer',
                  selectedCard === item.value ? 'bg-purple-500 text-white dark:bg-purple-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700']">
      <img :src="item.image">
      <div class="mt-4 flex items-end justify-between">
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight" :class="selectedCard === item.value ? 'text-white' : 'text-gray-900 dark:text-white'">{{ item.title }}</h5>
          <p class="font-normal" :class="selectedCard === item.value ? 'text-white' : 'text-gray-700 dark:text-gray-400'">Total alerts:</p>
        </div>
        <span class="flex items-center gap-1 text-sm font-medium">{{ item.alerts }}</span>
      </div> 
    </div>
  
</template>