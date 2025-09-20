<template>
  <div class="cursor-move">
    <!-- Image-only items: Auto-sized container -->
    <div v-if="item.img && !imageError" 
         class="overflow-hidden inline-block"
         :class="isImageOnly ? '' : 'flex items-center gap-2'">
      <img :src="item.img" 
           alt="" 
           :class="isImageOnly ? 'w-32 h-32 object-contain' : 'h-10 w-auto rounded object-cover'"
           @error="handleImageError" />
    </div>
    
    <!-- Fallback for failed images -->
    <div v-else-if="item.img" 
         class="rounded border border-gray-500/10 bg-gray-500/10 flex items-center justify-center"
         :class="isImageOnly ? 'w-24 h-24' : 'h-6 w-6'">
      <svg class="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
      </svg>
    </div>
    
    <!-- Text-only items: Compact container -->
    <div v-else class="flex items-center gap-2 rounded text-white px-2 py-1">
      <div class="truncate">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tile } from "@/types/tier";
const props = defineProps<{ item: Tile }>();

const imageError = ref(false);

// Check if this is an image-only item (no text label or very short label)
const isImageOnly = computed(() => {
  if (!props.item.img) return false;
  // Consider it image-only if label is very short (like just a filename) or empty
  return !props.item.label || props.item.label.length <= 10;
});

function handleImageError() {
  imageError.value = true;
}
</script>
