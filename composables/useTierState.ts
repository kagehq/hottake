import { ref, watch } from 'vue';
import { DEFAULT_TIERS, type TierKey, type TierState } from "@/types/tier";

function nanoid(n=8){
  const abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s=""; for(let i=0;i<n;i++) s+=abc[Math.floor(Math.random()*abc.length)];
  return s;
}

export const useTierState = () => {
  // Use a regular ref instead of useState to avoid SSR issues
  const state = ref<TierState>({
    tiers: DEFAULT_TIERS,
    placement: { S:[], A:[], B:[], C:[], F:[] },
    items: {},
    title: "Untitled Tier List...",
    v: 1
  });

  // Load from localStorage on client side
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tierlist-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state.value = parsed;
      } catch (e) {
        console.warn('Failed to parse saved tier list data:', e);
      }
    }
  }


  function addTextItems(lines: string[]) {
    lines.map(s => s.trim()).filter(Boolean).forEach(label => {
      const id = nanoid();
      state.value.items[id] = { id, label };
      state.value.placement.B.push(id);
    });
  }

  function addImageItem(file: File, label?: string) {
    const reader = new FileReader();
    reader.onload = () => {
      const id = nanoid();
      state.value.items[id] = { id, label: label || file.name, img: reader.result as string };
      state.value.placement.B.push(id);
    };
    reader.readAsDataURL(file);
  }

  function addUrlItem(url: string, label?: string) {
    try {
      const u = new URL(url);
      const id = nanoid();
      
      // Check if URL looks like an image
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(u.pathname) || 
                        u.hostname.includes('imgur') || 
                        u.hostname.includes('unsplash') ||
                        u.hostname.includes('pixabay');
      
      let imageUrl = url;
      
      // If it's not an image URL, try to get favicon
      if (!isImageUrl) {
        // Use Google's favicon service as fallback
        imageUrl = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
      }
      
      state.value.items[id] = { 
        id, 
        label: label || u.hostname, 
        img: imageUrl
      };
      state.value.placement.B.push(id);
    } catch {
      // ignore invalid URL
    }
  }

  function load(newState: TierState) { state.value = newState; }

  function deleteItem(itemId: string) {
    // Remove from all tier placements
    Object.keys(state.value.placement).forEach(tier => {
      const tierKey = tier as TierKey;
      const index = state.value.placement[tierKey].indexOf(itemId);
      if (index > -1) {
        state.value.placement[tierKey].splice(index, 1);
      }
    });
    
    // Remove from items
    delete state.value.items[itemId];
  }

  function clearData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tierlist-data');
    }
    state.value = {
      tiers: DEFAULT_TIERS,
      placement: { S:[], A:[], B:[], C:[], F:[] },
      items: {},
      title: "Untitled Tier List...",
      v: 1
    };
  }

  // Auto-save to localStorage whenever state changes
  if (typeof window !== 'undefined') {
    watch(state, (newState) => {
      localStorage.setItem('tierlist-data', JSON.stringify(newState));
    }, { deep: true });
  }

  return { state, addTextItems, addImageItem, addUrlItem, load, clearData, deleteItem };
};
