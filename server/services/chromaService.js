import { getCollection, initializeChroma } from "../config/db.js";

// Simple in-memory storage to avoid embedding API issues
let properties = [];

export const addProperties = async (newProperties) => {
  try {
    // Store properties in memory with documents
    newProperties.forEach((p) => {
      properties.push({
        ...p,
        document: `Area: ${p.area_sqft} sqft, Price: $${p.price}, Bedrooms: ${p.bedrooms}, Bathrooms: ${p.bathrooms}, Location: ${p.location}, Description: ${p.description}`,
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
    // Extract bedroom and bathroom requirements from query
    const bedroomMatch = query.match(/(\d+)\s*bedroom/i);
    const bathroomMatch = query.match(/(\d+)\s*bathroom/i);
    const targetBedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : null;
    const targetBathrooms = bathroomMatch ? parseInt(bathroomMatch[1]) : null;

    // Filter properties based on requirements
    const filteredProperties = properties.filter((p) => {
      let matches = true;

      if (targetBedrooms !== null) {
        matches = matches && p.bedrooms === targetBedrooms;
      }

      if (targetBathrooms !== null) {
        matches = matches && p.bathrooms === targetBathrooms;
      }

      return matches;
    });

    // If no exact matches, try close matches (within 1)
    let searchResults = filteredProperties;
    if (
      searchResults.length === 0 &&
      (targetBedrooms !== null || targetBathrooms !== null)
    ) {
      searchResults = properties.filter((p) => {
        let matches = true;

        if (targetBedrooms !== null) {
          matches = matches && Math.abs(p.bedrooms - targetBedrooms) <= 1;
        }

        if (targetBathrooms !== null) {
          matches = matches && Math.abs(p.bathrooms - targetBathrooms) <= 1;
        }

        return matches;
      });
    }

    // If still no matches, use all properties
    if (searchResults.length === 0) {
      searchResults = properties;
    }

    // Simple text-based matching on filtered results
    const queryLower = query.toLowerCase();
    const scores = searchResults.map((p) => {
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
