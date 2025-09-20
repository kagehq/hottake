import { StorageService } from '../storage'

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

    // Use storage service (Supabase with file system fallback)
    const storage = StorageService.getInstance();
    const tierListData = await storage.get(id);
    
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
    console.error('Get tier list error:', error);
    throw createError({
      statusCode: 404,
      statusMessage: 'Tier list not found'
    });
  }
});
