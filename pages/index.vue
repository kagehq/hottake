<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-4">
      

      <!-- Promotional Section -->
      <section class="relative overflow-hidden p-8 text-center">
        
        <!-- Content -->
        <div class="relative z-10">
          
          <!-- Main title -->
          <h1 class="text-4xl md:text-5xl font-bold text-blue-300 mb-4">
            Trumptier
          </h1>
          
          <!-- Separator -->
          <div class="flex items-center justify-center mb-6">
            <div class="w-8 h-px bg-gray-600"></div>
            <div class="w-1 h-1 bg-gray-600 rounded-full mx-2"></div>
            <div class="w-8 h-px bg-gray-600"></div>
          </div>
          
          <!-- Description -->
          <p class="text-gray-400 text-base leading-6 max-w-md mx-auto">
            The easiest and fastest way to<br>
            create and share tier lists.
          </p>
        </div>
      </section>

      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input v-model="state.title" 
               @focus="clearTitleOnFirstFocus"
               @blur="restoreTitleIfEmpty"
               class="bg-transparent placeholder-gray-500 text-base font-medium text-white outline-none border border-gray-500/10 rounded-xl px-0 py-2 focus:border-gray-500/5 focus:ring-2 focus:ring-gray-500/5 transition-all duration-200"
               placeholder="Add a Tier List title..." />
        <div class="flex flex-wrap items-center space-x-4">
                 <button @click="shareTierList" class="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-xl border border-blue-300 transition-all duration-200 font-medium text-sm flex items-center gap-2">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                   </svg>
                   {{ shareButtonText }}
                 </button>
          <button @click="exportPng" class="px-4 py-2 bg-gray-500/15 hover:bg-gray-500/20 text-white rounded-xl border border-gray-500/10 transition-all duration-200 font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Export
          </button>
          <span class="text-gray-500/60">|</span>
          <button @click="resetBoard" class="px-4 py-2 bg-gray-500/15 hover:bg-gray-500/20 text-gray-500 hover:text-white rounded-xl border border-gray-500/10 transition-all duration-200 font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Clear
          </button>
        </div>
      </header>

      <section id="board" class="inner-container mb-[-1px] ml-[-1px] relative border border-gray-500/25">
        <TierRow v-for="(t, index) in state.tiers" :key="t" :tier="t" :state="state" :isLast="index === state.tiers.length - 1" />
        <span
          class="main-section bottom-l absolute w-[1px] h-[1px] bottom-[-1px] left-[-1px]"
        ></span
        ><span
          class="main-section bottom-l absolute w-[1px] h-[1px] bottom-[-1px] right-[-1px]"
        ></span
        ><span
          class="main-section bottom-l absolute w-[1px] h-[1px] top-[-1px] right-[-1px]"
        ></span
        ><span
          class="main-section bottom-l absolute w-[1px] h-[1px] top-[-1px] left-[-1px]"
        ></span>
      </section>

      <section class="mt-8 space-y-6">
        <div class="text-center">
          <h2 class="text-base font-semibold text-white mb-1">Add Items</h2>
          <p class="text-gray-400 text-sm">Choose how you want to add items to your tier list</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
          <!-- Text Input Option -->
          <div class="bg-gray-500/10 border border-gray-500/10 rounded-xl p-4 flex flex-col space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-blue-300/10 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="font-medium text-white">Text</h3>
            </div>
            <textarea v-model="raw" 
                      class="w-full h-24 bg-gray-500/5 text-white placeholder-gray-500 outline-none border border-gray-500/10 rounded-lg px-3 py-2 text-sm focus:border-gray-500/10 focus:ring-1 focus:ring-gray-500/10 transition-all duration-200 resize-none flex-1"
                      placeholder="Paste items (one per line or comma-separated)"></textarea>
            <button @click="addText" 
                    class="w-full px-3 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-xl border border-blue-300 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add
            </button>
          </div>

          <!-- Image Upload Option -->
          <div class="bg-gray-500/10 border border-gray-500/10 rounded-xl p-4 flex flex-col space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="font-medium text-white">Upload Images</h3>
            </div>
            <div class="text-center py-4 flex-1 flex flex-col justify-center">
              <svg class="w-5 h-5 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-500 text-sm">Select multiple images</p>
            </div>
            <input type="file" multiple accept="image/*" @change="onFiles" 
                   class="hidden" id="file-input" />
            <label for="file-input" 
                   class="w-full px-3 py-2 bg-gray-500/10 hover:bg-gray-500/15 text-white rounded-xl border border-gray-500/10 cursor-pointer transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Choose Images
            </label>
          </div>

          <!-- URL Input Option -->
          <!-- <div class="bg-gray-500/10 border border-gray-500/10 rounded-xl p-4 flex flex-col space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
              </div>
              <h3 class="font-medium text-white">URL</h3>
            </div>
            <input v-model="url" 
                   placeholder="https://example.com/image.jpg" 
                   class="w-full bg-gray-500/5 text-white placeholder-gray-500 outline-none border border-gray-500/10 rounded-lg px-3 py-2 text-sm focus:border-gray-500/10 focus:ring-1 focus:ring-gray-500/10 transition-all duration-200 flex-1"/>
            <button @click="addUrl" 
                    class="w-full px-3 py-2 bg-gray-500/10 hover:bg-gray-500/15 text-white rounded-xl border border-gray-500/10 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              Add
            </button>
          </div> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTierState } from "~/composables/useTierState";
import { encodeState, decodeState } from "~/utils/lz";
import html2canvas from "html2canvas";
import TierRow from "~/components/TierRow.vue";

const { state, addTextItems, addImageItem, addUrlItem, load, clearData } = useTierState();
const raw = ref("");
const url = ref("");

const shareUrl = ref("");
const shareButtonText = ref("Share");

onMounted(async () => {
  // Update share URL with full URL
  shareUrl.value = `${window.location.origin}${window.location.pathname}#d=${encodeState(state.value)}`;
  
  const route = useRoute();
  
  // Check for remix parameter
  if (route.query.remix) {
    try {
      const response = await $fetch(`/api/tierlist/${route.query.remix}`);
      if (response.success && response.data) {
        load(response.data.state);
        // Clear the remix parameter from URL
        await navigateTo('/', { replace: true });
      }
    } catch (error) {
      console.error('Failed to load remix data:', error);
    }
  }
  
  // Check if we're on a tier list page (like /tierlist/abc123)
  const tierListId = route.params.id as string;
  if (tierListId && route.path.startsWith('/tierlist/')) {
    try {
      const response = await $fetch(`/api/tierlist/${tierListId}`);
      if (response.success && response.data) {
        load(response.data.state);
        // Redirect to main page to edit
        await navigateTo('/', { replace: true });
      }
    } catch (error) {
      console.error('Failed to load tier list data:', error);
    }
  }
  
  // Load from URL hash if present
  const m = window.location.hash.match(/^#d=(.+)$/);
  if (m?.[1]) {
    const decoded = decodeState(m[1]);
    if (decoded) load(decoded as any);
  }
});

// Watch for state changes to update share URL
watch(state, () => {
  if (typeof window !== 'undefined') {
    shareUrl.value = `${window.location.origin}${window.location.pathname}#d=${encodeState(state.value)}`;
  }
}, { deep: true });

function getTierColor(tier: string) {
  const colors = {
    "S": "bg-rose-500",
    "A": "bg-orange-400", 
    "B": "bg-amber-300",
    "C": "bg-lime-300",
    "F": "bg-green-300"
  };
  return colors[tier as keyof typeof colors] || "bg-gray-500";
}

function clearTitleOnFirstFocus() {
  // Only clear if the title is still the default placeholder
  if (state.value.title === "Untitled Tier List...") {
    state.value.title = "";
  }
}

function restoreTitleIfEmpty() {
  // Restore default title if user left the field empty
  if (state.value.title?.trim() === "") {
    state.value.title = "Untitled Tier List...";
  }
}

function addText(){
  const parts = raw.value.split(/\n|,/g).map(s=>s.trim()).filter(Boolean);
  if (parts.length) addTextItems(parts);
  raw.value = "";
}
function onFiles(e: Event){
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  [...files].forEach(f => addImageItem(f));
}
function addUrl(){ if (url.value) { addUrlItem(url.value); url.value=""; } }

async function exportPng(){
  try {
    const el = document.getElementById("board");
    if (!el) {
      alert("Could not find the tier list to export");
      return;
    }
    
    const canvas = await html2canvas(el, { 
      backgroundColor: "#0a0a0a", 
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const blob = await new Promise<Blob|null>(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      alert("Failed to create image");
      return;
    }
    
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${state.value.title || "tierlist"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
    
    alert("Tier list exported successfully!");
  } catch (error) {
    console.error("Export error:", error);
    alert("Failed to export tier list. Please try again.");
  }
}
async function shareTierList(){
  try {
    shareButtonText.value = "Sharing...";
    
    // Save the current tier list to get a public URL
    const response = await $fetch('/api/save', {
      method: 'POST',
      body: {
        state: state.value,
        createdAt: new Date().toISOString()
      }
    });
    
    if (response.success) {
      const publicUrl = `${window.location.origin}/tierlist/${response.id}`;
      await navigator.clipboard.writeText(publicUrl);
      shareButtonText.value = "Copied!";
      
      // Reset button text after 2 seconds
      setTimeout(() => {
        shareButtonText.value = "Share";
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to share tier list:', error);
    shareButtonText.value = "Failed";
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      shareButtonText.value = "Share";
    }, 2000);
  }
}
function resetBoard(){
  clearData();
}

// SEO meta tags for the main page
useHead({
  title: 'TrumpTier - Create and Share Tier Lists',
  meta: [
    { name: 'description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { property: 'og:title', content: 'TrumpTier - Create and Share Tier Lists' },
    { property: 'og:description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { property: 'og:image', content: '/api/og?default=true' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://trumptier.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'TrumpTier - Create and Share Tier Lists' },
    { name: 'twitter:description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { name: 'twitter:image', content: '/api/og?default=true' },
    { name: 'keywords', content: 'tier list, ranking, drag and drop, share, create, free, online tool' },
  ]
});
</script>
