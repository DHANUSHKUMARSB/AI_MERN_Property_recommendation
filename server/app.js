import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeChroma } from './config/db.js';

import uploadRoutes from './routes/uploadRoutes.js';
import generateRoutes from './routes/generateRoutes.js';
import queryRoutes from './routes/queryRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Property RAG API is running' });
});

app.use('/api/upload', uploadRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/query', queryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const initializeServer = async () => {
  try {
    await initializeChroma();
    console.log('ChromaDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize ChromaDB:', error);
    console.log('Please ensure ChromaDB is running on http://localhost:8000');
  }
};

initializeServer();

export default app;
