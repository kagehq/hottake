# Hottake

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
git clone https://github.com/kagehq/hottake.git
cd hottake
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



## 📝 License

This project is licensed under the FSL-1.1-MIT License. See the LICENSE file for details.