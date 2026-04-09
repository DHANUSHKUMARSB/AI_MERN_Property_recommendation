import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - POST /api/upload - Upload CSV file`);
  console.log(`  - POST /api/generate - Generate AI property data`);
  console.log(`  - POST /api/query - Query properties with RAG`);
  console.log(`  - GET  /api/health - Health check`);
});
