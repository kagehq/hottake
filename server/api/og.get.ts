export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string
  const isDefault = query.default === 'true'
  
  // Handle default OG image for main page
  if (isDefault) {
    const defaultSvg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="1200" height="630" fill="#000000"/>
        <rect width="1200" height="630" fill="url(#grid)"/>
        
        <!-- Title -->
        <text x="600" y="200" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="56" font-weight="bold">
          TrumpTier
        </text>
        
        <!-- Subtitle -->
        <text x="600" y="260" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="24" opacity="0.8">
          Create and Share Tier Lists
        </text>
        
        <!-- Tier chips -->
        <g transform="translate(600, 350)">
          <rect x="-150" y="-20" width="60" height="40" rx="12" fill="#fb7185"/>
          <text x="-120" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">S</text>
          
          <rect x="-80" y="-20" width="60" height="40" rx="12" fill="#fdba74"/>
          <text x="-50" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">A</text>
          
          <rect x="-10" y="-20" width="60" height="40" rx="12" fill="#fcd34d"/>
          <text x="20" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">B</text>
          
          <rect x="60" y="-20" width="60" height="40" rx="12" fill="#bef264"/>
          <text x="90" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">C</text>
          
          <rect x="130" y="-20" width="60" height="40" rx="12" fill="#86efac"/>
          <text x="160" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">F</text>
        </g>
        
        <!-- Features -->
        <g transform="translate(600, 450)">
          <text x="0" y="0" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="18" opacity="0.7">
            Drag • Drop • Share • Discover
          </text>
        </g>
        
        <!-- Footer -->
        <text x="1100" y="590" text-anchor="end" fill="white" font-family="system-ui, sans-serif" font-size="20" opacity="0.7">
          trumptier.com
        </text>
      </svg>
    `
    
    return new Response(defaultSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tier list ID is required'
    })
  }

  // Fetch the tier list data from the in-memory store or file system
  let tierListData
  try {
    if (!global.tierListStore) {
      global.tierListStore = new Map()
    }
    
    tierListData = global.tierListStore.get(id)
    
    // If not in memory, try to load from file system
    if (!tierListData) {
      try {
        const fs = await import('fs/promises')
        const path = await import('path')
        const filePath = path.join(process.cwd(), 'data', `${id}.json`)
        
        const fileContent = await fs.readFile(filePath, 'utf-8')
        tierListData = JSON.parse(fileContent)
        
        // Store in memory for future requests
        global.tierListStore.set(id, tierListData)
      } catch (error) {
        // File doesn't exist or can't be read
      }
    }
    
    if (!tierListData) {
      throw new Error('Tier list not found')
    }
  } catch (error) {
    // Return a default OG image if tier list not found
    const defaultSvg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#000000"/>
        <text x="600" y="315" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="48" font-weight="bold">
          Tier List Not Found
        </text>
      </svg>
    `
    return new Response(defaultSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    })
  }

  const { state } = tierListData
  const title = state.title || 'Untitled Tier List'
  
  // Get top 3 S-tier items
  const sTierItems = state.placement.S?.slice(0, 3) || []
  const topItems = sTierItems.map(id => state.items[id]).filter(Boolean)
  
  // Tier colors matching the app
  const tierColors = {
    S: '#fb7185', // rose-400
    A: '#fdba74', // orange-300
    B: '#fcd34d', // amber-300
    C: '#bef264', // lime-300
    F: '#86efac'  // green-300
  }

  // Generate SVG with real data
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="#000000"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      
      <!-- Title -->
      <text x="600" y="120" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="48" font-weight="bold">
        ${title}
      </text>
      
      <!-- Tier chips -->
      <g transform="translate(600, 200)">
        <rect x="-150" y="-20" width="60" height="40" rx="12" fill="${tierColors.S}"/>
        <text x="-120" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">S</text>
        
        <rect x="-80" y="-20" width="60" height="40" rx="12" fill="${tierColors.A}"/>
        <text x="-50" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">A</text>
        
        <rect x="-10" y="-20" width="60" height="40" rx="12" fill="${tierColors.B}"/>
        <text x="20" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">B</text>
        
        <rect x="60" y="-20" width="60" height="40" rx="12" fill="${tierColors.C}"/>
        <text x="90" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">C</text>
        
        <rect x="130" y="-20" width="60" height="40" rx="12" fill="${tierColors.F}"/>
        <text x="160" y="5" text-anchor="middle" fill="black" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">F</text>
      </g>

      <!-- Top S-tier items -->
      ${topItems.length > 0 ? `
        <text x="600" y="320" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" opacity="0.9">
          Top S-Tier Items
        </text>
        
        <g transform="translate(600, 380)">
          ${topItems.map((item, index) => `
            <g transform="translate(${index * 200 - (topItems.length - 1) * 100}, 0)">
              <rect x="-80" y="-40" width="160" height="80" rx="12" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2"/>
              <text x="0" y="10" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="16" font-weight="600">
                ${item.label}
              </text>
            </g>
          `).join('')}
        </g>
      ` : ''}
      
      <!-- Footer -->
      <text x="1100" y="590" text-anchor="end" fill="white" font-family="system-ui, sans-serif" font-size="20" opacity="0.7">
        trumptier.com
      </text>
    </svg>
  `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
})