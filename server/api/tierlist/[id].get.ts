export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tier list ID is required'
      });
    }

    // Retrieve from the in-memory store or file system
    // In a real app, you'd fetch this from a database
    if (!global.tierListStore) {
      global.tierListStore = new Map();
    }
    
    let tierListData = global.tierListStore.get(id);
    
    // If not in memory, try to load from file system
    if (!tierListData) {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'data', `${id}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf-8');
        tierListData = JSON.parse(fileContent);
        
        // Store in memory for future requests
        global.tierListStore.set(id, tierListData);
      } catch (error) {
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
