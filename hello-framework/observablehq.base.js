import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Riješi apsolutni direktorij ovog modula
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Trenutni projekt iz ENV-a
export const CURRENT_PROJECT = process.env.CURRENT_PROJECT || "NOT_FOUND";

// Ispravno lociraj JSON unutar hello-framework/src/data/
const dataPath = path.resolve(__dirname, "src/data/combinedData.json");

let data = [];
if (fs.existsSync(dataPath)) {
  const jsonString = fs.readFileSync(dataPath, "utf-8");
  data = JSON.parse(jsonString);
} else {
  console.warn(`⚠️ Datoteka nije pronađena: ${dataPath}`);
}

//⚠️ obitelji
export { data };

console.log("typeof data:", typeof data);
console.log("Array.isArray(data):", Array.isArray(data));





