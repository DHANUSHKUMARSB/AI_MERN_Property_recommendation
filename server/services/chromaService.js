import { getCollection, initializeChroma } from "../config/db.js";

// Simple in-memory storage to avoid embedding API issues
let properties = [];

export const addProperties = async (newProperties) => {
  try {
    // Store properties in memory with documents
    newProperties.forEach((p) => {
      properties.push({
        ...p,
        document: `Area: ${p.area_sqft} sqft, Price: $${p.price}, Location: ${p.location}, Description: ${p.description}`,
      });
    });

    return { success: true, count: newProperties.length };
  } catch (error) {
    console.error("Error adding properties:", error);
    throw error;
  }
};

export const searchProperties = async (query, nResults = 5) => {
  try {
    // Simple text-based matching
    const queryLower = query.toLowerCase();
    const scores = properties.map((p) => {
      const text = p.document.toLowerCase();
      let score = 0;

      // Check for keyword matches
      const keywords = queryLower.split(/\s+/);
      keywords.forEach((keyword) => {
        if (text.includes(keyword)) {
          score += 1;
        }
      });

      // Check for number matches (price, area)
      const priceMatch = query.match(/(\d+)k/i);
      if (priceMatch) {
        const targetPrice = parseInt(priceMatch[1]) * 1000;
        if (p.price <= targetPrice) {
          score += 2;
        }
      }

      return { property: p, score };
    });

    // Sort by score and return top results
    scores.sort((a, b) => b.score - a.score);
    const topResults = scores.slice(0, nResults).filter((s) => s.score > 0);

    if (topResults.length === 0) {
      return { documents: [[]] };
    }

    const documents = topResults.map((s) => s.property.document);
    return { documents: [documents] };
  } catch (error) {
    console.error("Error searching properties:", error);
    throw error;
  }
};

export const getCollectionCount = async () => {
  return properties.length;
};

export const clearAllProperties = async () => {
  properties = [];
  return { success: true, message: "All properties cleared" };
};

export default {
  addProperties,
  searchProperties,
  getCollectionCount,
  clearAllProperties,
};
