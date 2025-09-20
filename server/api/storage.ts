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
    
    // For now, we'll use the file system approach
    // In production, this would connect to a database
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
    } catch (error) {
      console.error('Failed to save to file system:', error);
      // In production, this would fall back to database
    }
  }

  async get(id: string): Promise<TierListData | null> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Try to load from file system
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
        return data;
      }
    } catch (error) {
      console.error('Failed to load from file system:', error);
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    this.cache.delete(id);
    
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const tierListsFile = path.join(process.cwd(), 'data', 'tierlists.json');
      
      const fileContent = await fs.readFile(tierListsFile, 'utf-8');
      const allTierLists: Record<string, TierListData> = JSON.parse(fileContent);
      delete allTierLists[id];
      
      await fs.writeFile(tierListsFile, JSON.stringify(allTierLists, null, 2));
    } catch (error) {
      console.error('Failed to delete from file system:', error);
    }
  }
}
