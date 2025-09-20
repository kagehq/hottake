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
            {{ exportButtonText }}
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
        <TierRow v-for="(t, index) in state.tiers" :key="t" :tier="t" :state="state" :isLast="index === state.tiers.length - 1" @delete="deleteItem" />
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
              <!-- <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"></path>
              </svg> -->
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
import { useTierState } from "~/composables/useTierState";
import { encodeState, decodeState } from "~/utils/lz";
import html2canvas from "html2canvas";
import TierRow from "~/components/TierRow.vue";

const { state, addTextItems, addImageItem, addUrlItem, load, clearData, deleteItem } = useTierState();
const raw = ref("");
const url = ref("");

const shareUrl = ref("");
const shareButtonText = ref("Share");
const exportButtonText = ref("Export");

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
    exportButtonText.value = "Exporting...";
    
    const el = document.getElementById("board");
    if (!el) {
      exportButtonText.value = "Failed";
      setTimeout(() => { exportButtonText.value = "Export"; }, 2000);
      return;
    }
    
    // Temporarily adjust styles for better capture
    const originalOverflow = el.style.overflow;
    const originalHeight = el.style.height;
    const originalMaxWidth = el.style.maxWidth;
    el.style.overflow = 'visible';
    el.style.height = 'auto';
    el.style.maxWidth = 'none';
    
    const canvas = await html2canvas(el, { 
      backgroundColor: "#0a0a0a", 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: el.scrollWidth,
      height: el.scrollHeight,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight,
      ignoreElements: (element) => {
        // Ignore the decorative corner elements
        return element.classList.contains('main-section');
      }
    });
    
    // Restore original styles
    el.style.overflow = originalOverflow;
    el.style.height = originalHeight;
    el.style.maxWidth = originalMaxWidth;
    
    const blob = await new Promise<Blob|null>(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      exportButtonText.value = "Failed";
      setTimeout(() => { exportButtonText.value = "Export"; }, 2000);
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
    
    exportButtonText.value = "Exported!";
    setTimeout(() => { exportButtonText.value = "Export"; }, 2000);
  } catch (error) {
    console.error("Export error:", error);
    exportButtonText.value = "Failed";
    setTimeout(() => { exportButtonText.value = "Export"; }, 2000);
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
  title: 'Trumptier - Create and Share Tier Lists',
  meta: [
    { name: 'description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { property: 'og:title', content: 'Trumptier - Create and Share Tier Lists' },
    { property: 'og:description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { property: 'og:image', content: '/api/og?default=true' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://trumptier.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Trumptier - Create and Share Tier Lists' },
    { name: 'twitter:description', content: 'Create beautiful tier lists with drag and drop. Share your rankings with friends and discover what others think. Free tier list maker with custom categories.' },
    { name: 'twitter:image', content: '/api/og?default=true' },
    { name: 'keywords', content: 'tier list, ranking, drag and drop, share, create, free, online tool' },
  ]
});
</script>
