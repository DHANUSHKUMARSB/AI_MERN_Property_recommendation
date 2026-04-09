import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient({
  path: "http://localhost:8000",
});

let collection = null;

export const initializeChroma = async () => {
  try {
    // Try to get existing collection
    try {
      collection = await chromaClient.getCollection({ name: "properties" });
      console.log("Using existing ChromaDB collection: properties");
    } catch (getError) {
      // Collection doesn't exist, create it
      collection = await chromaClient.createCollection({
        name: "properties",
        metadata: { description: "House property embeddings" },
      });
      console.log("Created new ChromaDB collection: properties");
    }
    return collection;
  } catch (error) {
    console.error("Error initializing ChromaDB:", error);
    throw error;
  }
};

export const getCollection = () => {
  if (!collection) {
    throw new Error(
      "ChromaDB collection not initialized. Call initializeChroma() first.",
    );
  }
  return collection;
};

export const clearCollection = async () => {
  try {
    if (collection) {
      await chromaClient.deleteCollection({ name: "properties" });
      collection = await chromaClient.createCollection({
        name: "properties",
        metadata: { description: "House property embeddings" },
      });
      console.log("Cleared and recreated ChromaDB collection");
      return collection;
    }
  } catch (error) {
    console.error("Error clearing collection:", error);
    throw error;
  }
};

export default { initializeChroma, getCollection, clearCollection };
