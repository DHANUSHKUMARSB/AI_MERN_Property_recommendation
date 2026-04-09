# Vercel Deployment Guide

## Important Note About ChromaDB

This project uses ChromaDB with local persistent storage (`chroma_data/`), which **will not work on Vercel** because:
- Vercel functions are stateless
- Vercel doesn't provide persistent file storage
- ChromaDB data will be lost on each function execution

## Deployment Options

### Option 1: Deploy Backend Separately (Recommended)

Deploy the backend to a service that supports persistent storage and frontend to Vercel.

**Backend Deployment (Render/Railway/Heroku):**
1. Push code to GitHub
2. Connect GitHub to Render/Railway/Heroku
3. Configure environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
4. Deploy

**Frontend Deployment (Vercel):**
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `VITE_API_BASE_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)
4. Deploy

### Option 2: Use ChromaDB Cloud

1. Sign up for ChromaDB Cloud at https://www.trychroma.com/
2. Get your API key and host URL
3. Update `server/services/chromaService.js` to use ChromaDB Cloud:
   ```javascript
   const client = new ChromaClient({
     auth: process.env.CHROMA_API_KEY,
     host: process.env.CHROMA_HOST
   });
   ```
4. Deploy both frontend and backend to Vercel

## Steps to Deploy Frontend to Vercel

1. **Update .env.example:**
   Already created at `client/.env.example`

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Root directory: `.`
   - Build command: `cd client && npm run build`
   - Output directory: `client/dist`

4. **Configure Environment Variables:**
   - Add `VITE_API_BASE_URL` with your backend URL

5. **Deploy**

## Steps to Deploy Backend to Render

1. **Create `server/Procfile`:**
   ```
   web: node server.js
   ```

2. **Push to GitHub**

3. **Import to Render:**
   - Go to https://render.com
   - Click "New Web Service"
   - Connect your GitHub repository
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `node server.js`

4. **Configure Environment Variables:**
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `PORT`: 5000

5. **Deploy**

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api  # Local development
VITE_API_BASE_URL=https://your-backend.onrender.com/api  # Production
```

### Backend (.env)
```
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Current Project Structure

```
Property_Recommander_RAG_MERN/
├── client/          # React frontend (deploy to Vercel)
├── server/          # Node.js backend (deploy to Render/Railway/Heroku)
├── vercel.json      # Vercel configuration
└── DEPLOYMENT.md    # This file
```

## Summary

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render/Railway/Heroku (for ChromaDB persistence)
- **ChromaDB**: Use local storage for development, ChromaDB Cloud for production
