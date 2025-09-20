# TrumpTier

Create and share beautiful tier lists with drag and drop. Rank anything from programming languages to pizza toppings!

## Features

- **Drag & Drop** - Intuitive tier list creation with vuedraggable
- **Share & Remix** - Public URLs and remix functionality
- **OG Images** - Auto-generated social media previews
- **Persistent Storage** - Tier lists saved permanently in Supabase
- **Export PNG** - Download your tier lists as images
- **Auto-save** - Local storage backup with cloud persistence

## Quick Start

### Prerequisites
- Node.js 20+ 
- Supabase account

### Setup

1. **Clone and install:**
```bash
git clone https://github.com/kagehq/trumptier.git
cd trumptier
npm install
```

2. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings → API and copy your Project URL and anon key
   - Run the SQL schema in Supabase Dashboard → SQL Editor:
   ```sql
   CREATE TABLE tier_lists (
     id TEXT PRIMARY KEY,
     state JSONB NOT NULL,
     remix_of TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   ALTER TABLE tier_lists ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public access" ON tier_lists FOR ALL USING (true);
   ```

3. **Configure environment:**
```bash
# Copy the example file
cp env.example .env

# Edit .env with your Supabase credentials
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

4. **Start development:**
```bash
npm run dev
```

Visit `http://localhost:3000` to start creating tier lists!

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 with Vue 3
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Drag & Drop**: VueDraggable
- **Image Export**: html2canvas
- **URL Compression**: lz-string
- **Deployment**: Vercel

## 📁 Project Structure

```
trumptier/
├── components/          # Vue components
│   ├── ItemTile.vue    # Individual tier item
│   └── TierRow.vue     # Tier row with drag/drop
├── composables/         # Vue composables
│   └── useTierState.ts # State management
├── lib/                # Utilities
│   └── supabase.ts     # Supabase client
├── pages/              # Nuxt pages
│   ├── index.vue       # Main editor
│   └── tierlist/[id].vue # Public view
├── server/api/         # API endpoints
│   ├── save.post.ts    # Save tier list
│   ├── tierlist/[id].get.ts # Get tier list
│   ├── og.get.ts       # OG image generation
│   └── storage.ts      # Storage abstraction
└── types/              # TypeScript types
    └── tier.ts         # Tier list types
```

## 🔧 Development

The app uses a hybrid storage approach:
- **Primary**: Supabase database for persistence
- **Fallback**: File system for development
- **Cache**: In-memory for performance

## 📝 License

This project is licensed under the FSL-1.1-MIT License. See the LICENSE file for details.