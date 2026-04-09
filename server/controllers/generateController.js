import { generatePropertyData } from "../services/hfService.js";
import { addProperties } from "../services/chromaService.js";
import { parseCSV } from "../utils/csvParser.js";

export const generateData = async (req, res) => {
  try {
    const csvData = await generatePropertyData();
    const properties = await parseCSV(csvData);

    if (properties.length === 0) {
      return res.status(500).json({ error: "Failed to parse generated data" });
    }

    const result = await addProperties(properties);

    res.status(200).json({
      success: true,
      message: `Successfully generated and stored ${properties.length} properties`,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Error generating data:", error);
    res.status(500).json({
      error: error.message || "Failed to generate property data",
      details: error.response?.data || error.toString(),
    });
  }
};

export default { generateData };
