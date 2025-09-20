<template>
  <div class="grid grid-cols-[64px_1fr] items-stretch" :class="{ 'border-b-0': isLast }">
    <div class="flex items-center justify-center font-medium py-4 text-sm text-black" :class="colorClass">
      {{ tier }}
    </div>
    <!-- Draggable version for editing -->
    <draggable
      v-if="!readonly && isMounted"
      class="flex flex-wrap items-center gap-1 p-2 border border-r-0 border-l-0 border-t-0 border-gray-500/25"
      :list="ids"
      :group="{ name: 'tiles' }"
      item-key="id"
      @change="noop">
      <template #item="{ element }">
        <ItemTile v-if="items[element]" :item="items[element]" />
      </template>
    </draggable>
    
    <!-- Fallback for SSR and before mount -->
    <div
      v-else-if="!readonly"
      class="flex flex-wrap items-center gap-1 p-2 bg-gray-500/10 border border-gray-50/10">
      <template v-for="element in ids" :key="element">
        <ItemTile v-if="items[element]" :item="items[element]" />
      </template>
    </div>
    
    <!-- Static version for public view -->
    <div
      v-else
      class="flex flex-wrap gap-1 p-2 bg-gray-500/10 border border-gray-50/10">
      <template v-for="element in ids" :key="element">
        <ItemTile v-if="items[element]" :item="items[element]" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import draggable from "vuedraggable";
import ItemTile from "./ItemTile.vue";
import type { TierKey, TierState } from "@/types/tier";

const props = defineProps<{ tier: TierKey, state: TierState, readonly?: boolean, isLast?: boolean }>();
const isMounted = ref(false);

const items = computed(() => props.state.items);
const ids = computed({
  get: () => props.state.placement[props.tier],
  set: (v: string[]) => (props.state.placement[props.tier] = v)
});
const colorClass = computed(() => ({
  "S":"bg-rose-400","A":"bg-orange-300","B":"bg-amber-300",
  "C":"bg-lime-300","F":"bg-green-300"
}[props.tier]));

onMounted(() => {
  isMounted.value = true;
});

function noop() {}
</script>
