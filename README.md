# 🧠 AI House Property Recommendation System (RAG-based)

A production-ready MERN stack application with AI-powered Retrieval-Augmented Generation (RAG) using OpenRouter, HuggingFace embeddings, and ChromaDB.

## 🎯 Features

- **CSV Upload**: Upload property data in CSV format for storage and retrieval
- **AI Data Generation**: Generate synthetic property listings using OpenRouter AI
- **Vector Storage**: Store property embeddings in ChromaDB for semantic search
- **Natural Language Query**: Query properties using natural language
- **RAG Pipeline**: Retrieve relevant properties using vector similarity search
- **Smart Recommendations**: Get property recommendations based on your requirements

## 🧱 Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- Multer (CSV upload)
- dotenv

### AI Layer

- **OpenRouter API**: AI generation for property data
- **HuggingFace API**: Vector embeddings (sentence-transformers/all-MiniLM-L6-v2)

### Vector Database

- **ChromaDB**: Vector storage and similarity search (local or cloud)

## 📁 Project Structure

```
root/
│
├── client/ (React frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCSV.jsx
│   │   │   ├── GenerateData.jsx
│   │   │   ├── QueryBox.jsx
│   │   │   └── ResultDisplay.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/ (Express backend)
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   ├── generateRoutes.js
│   │   └── queryRoutes.js
│   ├── controllers/
│   │   ├── uploadController.js
│   │   ├── generateController.js
│   │   └── queryController.js
│   ├── services/
│   │   ├── ragService.js
│   │   ├── chromaService.js
│   │   ├── hfService.js
│   │   └── embeddingService.js
│   ├── utils/
│   │   └── csvParser.js
│   ├── config/
│   │   └── db.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── sample_properties.csv
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenRouter API Key (for AI generation)
- HuggingFace API Key (for embeddings)
- ChromaDB (optional - will use local storage if not configured)

### Step 1: Configure Environment Variables

Edit `server/.env` and add your API keys:

```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here
HF_API_KEY=your_huggingface_api_key_here
```

To get API keys:

1. **OpenRouter**: Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. **HuggingFace**: Go to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. Copy and paste them into the `.env` file

### Step 2: Install ChromaDB (Optional)

ChromaDB is used for vector storage. It will use local storage by default.

For local ChromaDB (optional):

```bash
# Using pip
pip install chromadb

# Run ChromaDB
chroma-server --host localhost --port 8000
```

For ChromaDB Cloud (recommended for production):

```env
# Add to server/.env
CHROMA_HOST=your-chroma-host
CHROMA_API_KEY=your-chroma-api-key
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 4: Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Step 5: Start the Backend Server

```bash
cd ../server
npm run dev
```

The backend will start on `http://localhost:5000`

### Step 6: Start the Frontend Development Server

```bash
cd ../client
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📖 Usage

### Option 1: Upload CSV File

1. Click "Upload CSV" section
2. Select a CSV file with the following format:
   ```csv
   area_sqft,price,bedrooms,bathrooms,location,description
   1500,250000,2,2,Los Angeles CA,Spacious 2-bedroom apartment
   2000,450000,3,2,Miami FL,Beautiful 3-bedroom house near beach
   ```
3. Click "Upload CSV"

### Option 2: Generate AI Data

1. Click "Generate Properties" button
2. The system will generate 20 realistic property listings using OpenRouter AI
3. Data will be automatically stored in ChromaDB with vector embeddings

### Query Properties

1. After uploading or generating data, use the search box
2. Enter your requirements in natural language:
   - "house under 300k near beach"
   - "3 bedroom apartment in downtown"
   - "luxury villa with pool"
3. Click "Find Properties"
4. View AI-generated recommendations

## 🧪 Testing

A sample CSV file (`sample_properties.csv`) is provided for testing:

```bash
# Use the sample file to test the upload feature
```

## 🔌 API Endpoints

### Backend API

- `POST /api/upload` - Upload CSV file
- `POST /api/generate` - Generate AI property data
- `POST /api/query` - Query properties with RAG
- `GET /api/health` - Health check

## 🛠️ Troubleshooting

### ChromaDB Connection Error

Make sure ChromaDB is running:

```bash
# Check if ChromaDB is running
curl http://localhost:8000
```

### OpenRouter API Error

- Verify your API key in `server/.env`
- Ensure you have sufficient API credits
- Check your internet connection

### HuggingFace API Error

- Verify your HF_API_KEY in `server/.env`
- Ensure you have sufficient API credits
- Check your internet connection

### Frontend Not Connecting to Backend

- Verify backend is running on port 5000
- Check CORS configuration in `server/app.js`
- Verify API base URL in `client/src/services/api.js`

## 📝 CSV Format

Your CSV file must have these columns:

- `area_sqft`: Property area in square feet (number)
- `price`: Property price (number, no currency symbol)
- `bedrooms`: Number of bedrooms (number)
- `bathrooms`: Number of bathrooms (number)
- `location`: Property location (string)
- `description`: Property description (string)

Example:

```csv
area_sqft,price,bedrooms,bathrooms,location,description
1500,250000,2,2,Los Angeles CA,Spacious 2-bedroom apartment with modern kitchen
```

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive data
- Implement rate limiting for production use
- Add authentication for production deployment

## 🚀 Deployment

For production deployment:

1. Deploy ChromaDB to a cloud service
2. Deploy backend to a hosting service (e.g., Heroku, AWS, Vercel)
3. Deploy frontend to Vercel or Netlify
4. Configure production environment variables
5. Set up proper CORS configuration
6. Implement authentication and rate limiting

## 📄 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 🙏 Acknowledgments

- **OpenRouter** for AI generation API
- **HuggingFace** for vector embeddings (sentence-transformers)
- **ChromaDB** for vector storage and similarity search
- **React** and **Tailwind CSS** for the frontend
