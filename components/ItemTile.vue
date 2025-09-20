<template>
  <div class="cursor-move relative group" draggable="true">
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
    <div v-else class="flex items-center gap-3 text-white px-2 py-1">
      <div class="truncate leading-7">{{ item.label }}</div>
    </div>
    
    <!-- Delete button (appears on hover) -->
    <button 
      @click="deleteItem"
      class="absolute -top-2 -right-2 w-5 h-5 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
      title="Delete item"
    >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-2.5">
      <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
    </svg>

    </button>
  </div>
</template>

<script setup lang="ts">
import type { Tile } from "@/types/tier";
const props = defineProps<{ item: Tile }>();
const emit = defineEmits<{ delete: [itemId: string] }>();

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

function deleteItem() {
  emit('delete', props.item.id);
}
</script>
