const ResultDisplay = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommendation</h2>
        <p className="text-gray-500">Search for properties to see recommendations here.</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommendation</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {result.error}
        </div>
      </div>
    );
  }

  const isNoMatch = result.recommendation === 'No property match, try changing requirement.';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommendation</h2>
      
      {isNoMatch ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="font-semibold">No property match, try changing requirement.</p>
        </div>
      ) : (
        <div className="prose max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{result.recommendation}</p>
          </div>
        </div>
      )}

      {result.query && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <strong>Your query:</strong> {result.query}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
