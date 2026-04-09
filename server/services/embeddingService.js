import axios from "axios";

const HF_API_URL = "https://router.huggingface.co/v1";
const HF_API_KEY = process.env.HF_API_KEY;

export const createEmbedding = async (text) => {
  try {
    const response = await axios.post(
      `${HF_API_URL}/embeddings`,
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        input: text,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // The API returns the embedding as an array
    return response.data.data[0].embedding;
  } catch (error) {
    console.error(
      "Error creating embedding:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to create embedding");
  }
};

export const createEmbeddings = async (texts) => {
  try {
    const response = await axios.post(
      `${HF_API_URL}/embeddings`,
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        input: texts,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // The API returns embeddings as an array of arrays
    return response.data.data.map((item) => item.embedding);
  } catch (error) {
    console.error(
      "Error creating embeddings:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to create embeddings");
  }
};

export default { createEmbedding, createEmbeddings };
