import { supabase, type TierListRow } from '~/lib/supabase'

// Simple storage abstraction that can be easily swapped
export interface TierListData {
  id: string;
  state: any;
  remixOf?: string | null;
  createdAt: string;
  updatedAt: string;
}

export class StorageService {
  private static instance: StorageService;
  private cache = new Map<string, TierListData>();

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async save(data: TierListData): Promise<void> {
    // Store in memory cache
    this.cache.set(data.id, data);
    
    // Try Supabase first
    try {
      const { error } = await supabase
        .from('tier_lists')
        .upsert({
          id: data.id,
          state: data.state,
          remix_of: data.remixOf,
          created_at: data.createdAt,
          updated_at: data.updatedAt
        });

      if (error) {
        console.error('Supabase save error:', error);
        throw error;
      }
      
      console.log(`Saved tier list ${data.id} to Supabase`);
      return;
    } catch (error) {
      console.warn('Supabase save failed, falling back to file system:', error);
    }
    
    // Fallback to file system
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataDir = path.join(process.cwd(), 'data');
      const tierListsFile = path.join(dataDir, 'tierlists.json');
      
      // Read existing data
      let allTierLists: Record<string, TierListData> = {};
      try {
        const existingData = await fs.readFile(tierListsFile, 'utf-8');
        allTierLists = JSON.parse(existingData);
      } catch (e) {
        // File doesn't exist yet
      }
      
      // Update with new data
      allTierLists[data.id] = data;
      
      // Write back
      await fs.writeFile(tierListsFile, JSON.stringify(allTierLists, null, 2));
      console.log(`Saved tier list ${data.id} to file system (fallback)`);
    } catch (error) {
      console.error('Failed to save to file system:', error);
      throw new Error('Failed to save tier list');
    }
  }

  async get(id: string): Promise<TierListData | null> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Try Supabase first
    try {
      const { data: row, error } = await supabase
        .from('tier_lists')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase get error:', error);
        throw error;
      }

      if (row) {
        const tierListData: TierListData = {
          id: row.id,
          state: row.state,
          remixOf: row.remix_of,
          createdAt: row.created_at,
          updatedAt: row.updated_at
        };
        
        // Cache for future requests
        this.cache.set(id, tierListData);
        console.log(`Loaded tier list ${id} from Supabase`);
        return tierListData;
      }
    } catch (error) {
      console.warn('Supabase get failed, falling back to file system:', error);
    }

    // Fallback to file system
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const tierListsFile = path.join(process.cwd(), 'data', 'tierlists.json');
      
      const fileContent = await fs.readFile(tierListsFile, 'utf-8');
      const allTierLists: Record<string, TierListData> = JSON.parse(fileContent);
      const data = allTierLists[id];
      
      if (data) {
        // Cache for future requests
        this.cache.set(id, data);
        console.log(`Loaded tier list ${id} from file system (fallback)`);
        return data;
      }
    } catch (error) {
      console.error('Failed to load from file system:', error);
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    this.cache.delete(id);
    
    // Try Supabase first
    try {
      const { error } = await supabase
        .from('tier_lists')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      console.log(`Deleted tier list ${id} from Supabase`);
      return;
    } catch (error) {
      console.warn('Supabase delete failed, falling back to file system:', error);
    }
    
    // Fallback to file system
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const tierListsFile = path.join(process.cwd(), 'data', 'tierlists.json');
      
      const fileContent = await fs.readFile(tierListsFile, 'utf-8');
      const allTierLists: Record<string, TierListData> = JSON.parse(fileContent);
      delete allTierLists[id];
      
      await fs.writeFile(tierListsFile, JSON.stringify(allTierLists, null, 2));
      console.log(`Deleted tier list ${id} from file system (fallback)`);
    } catch (error) {
      console.error('Failed to delete from file system:', error);
    }
  }
}
