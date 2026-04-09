import { useState } from 'react';
import UploadCSV from '../components/UploadCSV';
import GenerateData from '../components/GenerateData';
import QueryBox from '../components/QueryBox';
import ResultDisplay from '../components/ResultDisplay';

const Home = () => {
  const [queryResult, setQueryResult] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleUploadSuccess = (result) => {
    setDataLoaded(true);
    setQueryResult(null);
  };

  const handleGenerateSuccess = (result) => {
    setDataLoaded(true);
    setQueryResult(null);
  };

  const handleQueryResult = (result) => {
    setQueryResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏠 AI Property Recommendation System
          </h1>
          <p className="text-gray-600 text-lg">
            Upload property data or generate AI-powered listings, then search with natural language
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <UploadCSV onUploadSuccess={handleUploadSuccess} />
            <GenerateData onGenerateSuccess={handleGenerateSuccess} />
          </div>

          <QueryBox onQueryResult={handleQueryResult} />

          {queryResult && (
            <ResultDisplay result={queryResult} />
          )}

          {dataLoaded && !queryResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700">
                ✅ Property data loaded successfully! You can now search for properties.
              </p>
            </div>
          )}

          {!dataLoaded && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700">
                ⚠️ Please upload a CSV file or generate AI data before searching for properties.
              </p>
            </div>
          )}
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by LangChain, ChromaDB, and HuggingFace</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
