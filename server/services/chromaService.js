import { ChromaClient } from "chromadb";
import { createEmbedding, createEmbeddings } from "./embeddingService.js";

let client = null;
let collection = null;

const initializeChromaClient = async () => {
  if (client) return client;

  // Use ChromaDB Cloud if credentials are provided, otherwise use local storage
  if (process.env.CHROMA_HOST && process.env.CHROMA_API_KEY) {
    client = new ChromaClient({
      auth: process.env.CHROMA_API_KEY,
      host: process.env.CHROMA_HOST,
    });
  } else {
    client = new ChromaClient({
      path: "./chroma_data",
    });
  }

  try {
    // Get or create collection
    collection = await client.getOrCreateCollection({
      name: "properties",
    });
  } catch (error) {
    console.error("Error initializing ChromaDB:", error);
    throw error;
  }

  return client;
};

export const addProperties = async (newProperties) => {
  try {
    await initializeChromaClient();

    const ids = newProperties.map((_, i) => `prop_${Date.now()}_${i}`);
    const documents = newProperties.map(
      (p) =>
        `Area: ${p.area_sqft} sqft, Price: $${p.price}, Bedrooms: ${p.bedrooms}, Bathrooms: ${p.bathrooms}, Location: ${p.location}, Description: ${p.description}`,
    );
    const metadatas = newProperties.map((p) => ({
      area_sqft: p.area_sqft,
      price: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      location: p.location,
    }));

    // Create embeddings for the documents
    const embeddings = await createEmbeddings(documents);

    await collection.add({
      ids,
      embeddings,
      documents,
      metadatas,
    });

    return { success: true, count: newProperties.length };
  } catch (error) {
    console.error("Error adding properties:", error);
    throw error;
  }
};

export const searchProperties = async (query, nResults = 5) => {
  try {
    await initializeChromaClient();

    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults,
    });

    return results;
  } catch (error) {
    console.error("Error searching properties:", error);
    throw error;
  }
};

export const getCollectionCount = async () => {
  try {
    await initializeChromaClient();
    const count = await collection.count();
    return count;
  } catch (error) {
    console.error("Error getting collection count:", error);
    return 0;
  }
};

export const clearAllProperties = async () => {
  try {
    await initializeChromaClient();
    await client.deleteCollection({ name: "properties" });
    collection = await client.createCollection({ name: "properties" });
    return { success: true, message: "All properties cleared" };
  } catch (error) {
    console.error("Error clearing properties:", error);
    throw error;
  }
};

export default {
  addProperties,
  searchProperties,
  getCollectionCount,
  clearAllProperties,
};
