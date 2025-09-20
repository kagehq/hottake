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

    // Store the tier list data in memory and file system
    // In a real app, you'd save this to a database
    if (!global.tierListStore) {
      global.tierListStore = new Map();
    }
    global.tierListStore.set(id, tierListData);
    
    // Also save to file system for persistence
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataDir = path.join(process.cwd(), 'data');
      
      // Create data directory if it doesn't exist
      try {
        await fs.mkdir(dataDir, { recursive: true });
      } catch (e) {
        // Directory already exists
      }
      
      // Save tier list to file
      const filePath = path.join(dataDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(tierListData, null, 2));
    } catch (error) {
      console.warn('Failed to save to file system:', error);
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
