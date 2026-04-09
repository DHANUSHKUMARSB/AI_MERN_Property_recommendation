import { useState } from "react";
import { generateData } from "../services/api";

const GenerateData = ({ onGenerateSuccess }) => {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedProperties, setGeneratedProperties] = useState(null);
  const [showData, setShowData] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    setSuccess("");
    setShowData(false);

    try {
      const result = await generateData();
      setSuccess(result.message);
      setGeneratedProperties(result.properties || []);
      if (onGenerateSuccess) {
        onGenerateSuccess(result);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate data");
    } finally {
      setGenerating(false);
    }
  };

  const handleViewData = () => {
    setShowData(!showData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generate AI Property Data
      </h2>

      <p className="text-gray-600 mb-4">
        Generate 20 realistic house property listings using AI.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? "Generating..." : "Generate Properties"}
        </button>

        {generatedProperties && generatedProperties.length > 0 && (
          <button
            onClick={handleViewData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showData ? "Hide Data" : "View Data"}
          </button>
        )}
      </div>

      {showData && generatedProperties && generatedProperties.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Generated Properties
              </h3>
              <button
                onClick={handleViewData}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-60px)]">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Area (sqft)
                    </th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Bedrooms
                    </th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Bathrooms
                    </th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generatedProperties.map((property, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {property.area_sqft}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {property.bedrooms}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {property.bathrooms}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {property.location}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {property.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateData;
