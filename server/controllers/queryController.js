import { processQuery } from '../services/ragService.js';

export const queryProperties = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Query is required' });
    }

    const recommendation = await processQuery(query);

    res.status(200).json({
      success: true,
      recommendation,
      query
    });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
};

export default { queryProperties };
