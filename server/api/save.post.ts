import { StorageService } from './storage'

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

    // Save using storage service (Supabase with file system fallback)
    const storage = StorageService.getInstance();
    await storage.save(tierListData);
    
    return {
      success: true,
      id,
      url: `/tierlist/${id}`,
      data: tierListData
    };
  } catch (error) {
    console.error('Save error:', error);
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
