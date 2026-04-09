import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Generate property CSV data
export const generatePropertyData = async () => {
  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a real estate data generator. Generate realistic house property listings in CSV format.",
        },
        {
          role: "user",
          content: `Generate 20 house property listings in CSV format with columns: area_sqft, price, bedrooms, bathrooms, location, description.

STRICT REQUIREMENTS:
- area_sqft: INTEGER between 500 and 5000 (e.g., 1200, 2500, 3500)
- price: INTEGER between 100000 and 2000000 (e.g., 250000, 500000, 1200000) - DO NOT include $ sign or commas
- bedrooms: INTEGER between 1 and 6 (e.g., 2, 3, 4)
- bathrooms: INTEGER between 1 and 4 (e.g., 1, 2, 3)
- location: Full US city and state name (e.g., "Los Angeles, CA", "New York, NY", "Austin, TX")
- description: Realistic 2-3 sentence property description

CSV FORMAT (EXACT):
area_sqft,price,bedrooms,bathrooms,location,description
1200,350000,2,2,"Los Angeles, CA","Modern apartment with great views"
2500,750000,4,3,"New York, NY","Spacious family home in prime location"

IMPORTANT:
- area_sqft must be a number (no units, no text)
- price must be a number (no $ sign, no commas, no text)
- bedrooms must be a number (integer)
- bathrooms must be a number (integer)
- location must be a city name (not a number)
- description must be text (not a number)

Return ONLY the CSV data starting with the header row, no additional text.`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;

    const csvMatch = content.match(
      /area_sqft,price,bedrooms,bathrooms,location,description[\s\S]*?$/,
    );
    const csvData = csvMatch ? csvMatch[0] : content;

    return csvData;
  } catch (error) {
    console.error(
      "Error generating property data:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to generate property data");
  }
};

// Generate recommendation
export const generateRecommendation = async (query, retrievedDocs) => {
  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional real estate agent. Provide persuasive and helpful property recommendations.",
        },
        {
          role: "user",
          content: `User requirement: ${query}

Available properties:
${retrievedDocs}

Recommend the best matching property in a persuasive tone.
If no relevant match found, respond exactly with: 'No property match, try changing requirement.'`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "Error generating recommendation:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to generate recommendation");
  }
};

export default {
  generatePropertyData,
  generateRecommendation,
};
