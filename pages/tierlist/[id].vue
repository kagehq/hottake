<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <!-- Header with title and remix button -->
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">{{ tierListData?.state?.title || 'Tier List' }}</h1>
          <div v-if="tierListData?.remixOf" class="text-sm text-gray-400">
            Remixed from <span class="text-blue-400">#{{ tierListData.remixOf }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center space-x-4">
          <button @click="remixTierList" 
                  class="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-xl border border-blue-300 transition-all duration-200 font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Remix
          </button>
          <!-- <button @click="copyUrl" 
                  class="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-xl border border-blue-300 transition-all duration-200 font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy URL
          </button> -->
        </div>
      </header>

      <!-- Tier List Display -->
      <section v-if="tierListData" class="">
        <TierRow v-for="tier in tierListData.state.tiers" 
                 :key="tier" 
                 :tier="tier" 
                 :state="tierListData.state" 
                 :readonly="true" />
      </section>



      <!-- Loading State -->
      <div v-else-if="pending" class="flex items-center justify-center py-12">
        <div class="text-gray-400">Loading tier list...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center py-12">
        <div class="text-red-400">Failed to load tier list</div>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import TierRow from "~/components/TierRow.vue";

const route = useRoute();
const tierListId = route.params.id as string;

// Fetch tier list data
const { data: response, pending, error } = await useFetch(`/api/tierlist/${tierListId}`);
const tierListData = computed(() => response.value?.data);

// Remix functionality
async function remixTierList() {
  try {
    if (!tierListData.value) return;
    
    // Clone the state and add remix metadata
    const remixState = {
      ...tierListData.value.state,
      title: `${tierListData.value.state.title} (Remix)`
    };
    
    // Save the remix
    const response = await $fetch('/api/save', {
      method: 'POST',
      body: {
        state: remixState,
        remixOf: tierListId,
        createdAt: new Date().toISOString()
      }
    });
    
    if (response.success) {
      // Redirect to the main editor with the remixed data
      await navigateTo(`/?remix=${response.id}`);
    }
  } catch (error) {
    console.error('Failed to remix tier list:', error);
    alert('Failed to remix tier list. Please try again.');
  }
}

// Copy URL functionality
async function copyUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('URL copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy URL:', error);
    alert('Failed to copy URL. Please try again.');
  }
}

// SEO and OG tags - using computed values for proper reactivity
const pageTitle = computed(() => tierListData.value?.state?.title || 'Tier List');
const pageDescription = computed(() => `Check out this tier list: ${tierListData.value?.state?.title || 'Tier List'}`);

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: `/api/og?id=${tierListId}` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://trumptier.com/tierlist/${tierListId}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: `/api/og?id=${tierListId}` },
  ]
});
</script>
