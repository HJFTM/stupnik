import fs from "fs";
import path from "path";

export const CURRENT_PROJECT = process.env.CURRENT_PROJECT || "NOT_FOUND";

const filePath = path.resolve("src/data/obitelji.json");
const jsonString = fs.readFileSync(filePath, "utf-8");
export const data = JSON.parse(jsonString);

export function generirajObiteljiPoMjestu(data, rod) {
  if (!rod) rod = "Bosna";
  const mapaMjesta = {};
  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    const mjesto = o.MJESTO.trim();
    if (!mapaMjesta[mjesto]) mapaMjesta[mjesto] = [];
    mapaMjesta[mjesto].push({
      name: o.OBITELJ,
      path: `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`
    });
  }
  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: `Obitelji: ${mjesto}`,
    pages: obitelji
  }));
}

export function generirajMjestaOdObitelji(obitelji, rod) {
    if (rod == null) rod = "Bosna";
    const mjestaMap = new Map();
    const obitelj_m = obitelji.filter(o => o.TIP == "M");
    for (const o of obitelj_m) {
        if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ || !o.GODINA) continue;
        const mjesto = o.MJESTO.trim();
        const godina = parseInt(o.GODINA);

        if (!mjestaMap.has(mjesto)) {
            mjestaMap.set(mjesto, godina);
        } else {
            const postojecaGodina = mjestaMap.get(mjesto);
            if (godina < postojecaGodina) {
                mjestaMap.set(mjesto, godina);
            }
        }
    }

    return Array.from(mjestaMap.entries())
        .sort((a, b) => a[1] - b[1])  // sortiraj po godini (a[1] je godina)
        .map(([mjesto, godina]) => ({
            name: `${godina}. ${mjesto}`,
            path: `/pages/ENTITET/mjesto/${encodeURIComponent(mjesto)}`
        }));
}

