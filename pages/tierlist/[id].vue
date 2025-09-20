<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <!-- Header with title and remix button -->
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">{{ tierListData?.state?.title || 'hottake' }}</h1>
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
      <div v-else-if="error" class="relative flex items-center flex-col justify-center text-sm py-32 md:py-52 p-8 font-medium max-w-lg w-full">
        <main class="">
          <ol class="list-inside text-sm text-left text-white space-y-4">
            <li class="flex items-start">
              <div class="w-5 h-5 mr-2 flex text-xs flex-none items-center justify-center bg-white/10 rounded-md">
                1
              </div>
              <span class="text-white">
                The page you requested was not found.
              </span>
            </li>
            <li class="flex items-start">
              <div class="w-5 h-5 mr-2 flex text-xs flex-none items-center justify-center bg-white/10 rounded-md">
                2
              </div>
              <span class="text-white">
                Please try again later.
              </span>
            </li>
            <li class="flex items-center">
              <div class="w-5 h-5 mr-2 flex text-xs flex-none items-center justify-center bg-white/10 rounded-md">
                3
              </div>
              <span class="text-white md:-mt-1 space-x-2 flex items-center">
                <span>If you continue to see this error, contact us</span>
                <div class="inline-flex items-center space-x-3 ml-1">
                  <a
                    href="https://discord.gg/KqdBcqRk5E"
                    target="_blank"
                    class=" text-gray-400 hover:text-white flex items-center"
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5" fill="currentColor">
                      <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z"></path>
                    </svg>
                  </a>
                  <a href="https://x.com/withkage" class="text-gray-400 hover:text-white flex items-center">
                    <span class="sr-only">Twitter</span>
                    <svg aria-label="X formerly known as Twitter" fill="currentColor" class="h-4 w-4" viewBox="0 0 22 20"><path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" class="astro-3SDC4Q5U"></path></svg>
                  </a>
                </div>
              </span>
            </li>
          </ol>
          <div class="text-gray-400 mt-10">
            <a class="flex items-center gap-2 text-gray-400 hover:text-white text-sm" href="/" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                <path d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z" />
              </svg>
              Go to hottakehq.com →
            </a>
          </div>
        </main>
      </div>

      <footer aria-labelledby="footer-heading" class="w-full pt-20">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto px-4 md:px-0 md:max-w-2xl pb-4">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <a
              href="https://github.com/kagehq"
              target="_blank"
              class="flex items-center justify-center gap-2 text-center relative"
            >
              <span class="text-xs leading-[1.6] text-gray-500 font-medium">APO</span>
              <span class="flex items-center text-sm leading-[1.6] text-white font-bold">
                <img src="/assets/img/kage-long-blue.png" alt="Kage" class="h-5 kage-logo"/>
              </span>
            </a>
            <!-- <div class="flex items-center relative">
              <span class="text-ob-gray-color">&copy; 2024 Treadie, Inc.</span>
            </div> -->
            <div class="flex space-x-6 items-center md:mt-0 mt-4">
              <a
                href="https://discord.gg/KqdBcqRk5E"
                target="_blank"
                class="text-sm font-semibold leading-6 text-gray-500 hover:text-blue-300"
              >
              <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5" fill="currentColor">
                <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z"></path>
              </svg>
              </a>
              <a
                href="https://github.com/kagehq/port-kill"
                target="_blank"
                class="text-sm font-semibold leading-6 text-gray-500 hover:text-blue-300"
              >
                <svg
                  aria-label="github"
                  viewBox="0 0 14 14"
                  class="h-4 w-4"
                  fill="currentColor"
                >
                  <path
                    d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="https://x.com/withkage" class="text-gray-500 hover:text-blue-300">
                <span class="sr-only">X formerly known as Twitter</span>
                <svg aria-label="X formerly known as Twitter" fill="currentColor" class="h-4 w-4" viewBox="0 0 22 20"><path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" class="astro-3SDC4Q5U"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
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
const pageTitle = computed(() => tierListData.value?.state?.title || 'Hottake');
const pageDescription = computed(() => `Check out this tier list: ${tierListData.value?.state?.title || 'Hottake'}`);

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
    { property: 'og:url', content: `https://hottakehq.com/tierlist/${tierListId}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: `/api/og?id=${tierListId}` },
  ]
});
</script>
