export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tier list ID is required'
      });
    }

    console.log(`Looking for tier list with ID: ${id}`);

    // Retrieve from the in-memory store or file system
    // In a real app, you'd fetch this from a database
    if (!global.tierListStore) {
      global.tierListStore = new Map();
      console.log('Initialized new tierListStore');
    }
    
    let tierListData = global.tierListStore.get(id);
    console.log(`In-memory store has ${global.tierListStore.size} items`);
    
    if (tierListData) {
      console.log(`Found tier list ${id} in memory`);
    }
    
    // If not in memory, try to load from tierlists.json
    if (!tierListData) {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const tierListsFile = path.join(process.cwd(), 'data', 'tierlists.json');
        
        const fileContent = await fs.readFile(tierListsFile, 'utf-8');
        const allTierLists = JSON.parse(fileContent);
        tierListData = allTierLists[id];
        
        if (tierListData) {
          // Store in memory for future requests
          global.tierListStore.set(id, tierListData);
          console.log(`Loaded tier list ${id} from tierlists.json`);
        } else {
          console.log(`Tier list ${id} not found in tierlists.json`);
        }
      } catch (error) {
        console.log(`Failed to load tier list ${id} from tierlists.json:`, error);
        // File doesn't exist or can't be read
      }
    }
    
    if (!tierListData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Tier list not found'
      });
    }

    return {
      success: true,
      data: tierListData
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tier list not found'
    });
  }
});
