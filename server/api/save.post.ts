export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { state, remixOf, createdAt } = body;

    if (!state) {
      throw createError({
        statusCode: 400,
        statusMessage: 'State is required'
      });
    }

    // Generate a unique ID for this tier list
    const id = generateId();
    
    // Create the tier list data
    const tierListData = {
      id,
      state,
      remixOf: remixOf || null,
      createdAt: createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store the tier list data in the JSON file
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataDir = path.join(process.cwd(), 'data');
      const tierListsFile = path.join(dataDir, 'tierlists.json');
      
      // Create data directory if it doesn't exist
      try {
        await fs.mkdir(dataDir, { recursive: true });
      } catch (e) {
        // Directory already exists
      }
      
      // Read existing tier lists
      let allTierLists = {};
      try {
        const existingData = await fs.readFile(tierListsFile, 'utf-8');
        allTierLists = JSON.parse(existingData);
      } catch (e) {
        // File doesn't exist yet, start with empty object
      }
      
      // Add new tier list
      allTierLists[id] = tierListData;
      
      // Write back to file
      await fs.writeFile(tierListsFile, JSON.stringify(allTierLists, null, 2));
      console.log(`Saved tier list ${id} to tierlists.json`);
      
      // Also store in memory for faster access
      if (!global.tierListStore) {
        global.tierListStore = new Map();
      }
      global.tierListStore.set(id, tierListData);
      
    } catch (error) {
      console.error(`Failed to save tier list ${id}:`, error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save tier list'
      });
    }
    
    return {
      success: true,
      id,
      url: `/tierlist/${id}`,
      data: tierListData
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save tier list'
    });
  }
});

function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
