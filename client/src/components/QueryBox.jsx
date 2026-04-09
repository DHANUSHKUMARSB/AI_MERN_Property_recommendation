import { useState } from 'react';
import { queryProperties } from '../services/api';

const QueryBox = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [querying, setQuerying] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setQuerying(true);
    setError('');

    try {
      const result = await queryProperties(query);
      if (onQueryResult) {
        onQueryResult(result);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process query');
      if (onQueryResult) {
        onQueryResult({ error: err.response?.data?.error || 'Failed to process query' });
      }
    } finally {
      setQuerying(false);
    }
  };

  const exampleQueries = [
    'house under 300k near beach',
    '3 bedroom apartment in downtown',
    'luxury villa with pool',
    'affordable house for family',
    'modern apartment near schools'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Properties</h2>
      
      <form onSubmit={handleQuery}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Describe your ideal property
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., house under 300k near beach with 3 bedrooms"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={querying}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {querying ? 'Searching...' : 'Find Properties'}
        </button>
      </form>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Example queries:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setQuery(example)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryBox;
