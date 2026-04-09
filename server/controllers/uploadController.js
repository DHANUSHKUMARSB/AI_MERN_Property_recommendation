import { parseCSV } from '../utils/csvParser.js';
import { addProperties } from '../services/chromaService.js';

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const properties = await parseCSV(csvContent);

    if (properties.length === 0) {
      return res.status(400).json({ error: 'No valid properties found in CSV' });
    }

    const result = await addProperties(properties);

    res.status(200).json({
      success: true,
      message: `Successfully uploaded ${properties.length} properties`,
      count: properties.length,
      properties
    });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ error: 'Failed to process CSV file' });
  }
};

export default { uploadCSV };
