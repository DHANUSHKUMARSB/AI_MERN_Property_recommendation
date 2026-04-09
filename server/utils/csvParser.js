import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSV = (csvContent) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const readableStream = Readable.from(csvContent);

    readableStream
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          area_sqft: parseInt(data.area_sqft) || 0,
          price: parseInt(data.price) || 0,
          bedrooms: parseInt(data.bedrooms) || 0,
          bathrooms: parseInt(data.bathrooms) || 0,
          location: data.location || "",
          description: data.description || "",
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export default { parseCSV };
