import { searchProperties, getCollectionCount } from "./chromaService.js";

export const processQuery = async (query) => {
  try {
    const count = await getCollectionCount();

    if (count === 0) {
      return "No property match, try changing requirement.";
    }

    const results = await searchProperties(query, 5);

    if (!results.documents || results.documents[0].length === 0) {
      return "No property match, try changing requirement.";
    }

    const retrievedDocs = results.documents[0];

    // Generate a simple recommendation without AI
    const recommendation =
      `Based on your requirement "${query}", I found ${retrievedDocs.length} matching properties:\n\n` +
      retrievedDocs.map((doc, index) => `${index + 1}. ${doc}`).join("\n\n");

    return recommendation;
  } catch (error) {
    console.error("Error in RAG pipeline:", error);
    throw new Error("Failed to process query");
  }
};

export default { processQuery };
