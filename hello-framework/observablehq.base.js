import fs from "fs";
import path from "path";

export const CURRENT_PROJECT = process.env.CURRENT_PROJECT || "NOT_FOUND";

const filePath = path.resolve("src/data/obitelji.json");
const jsonString = fs.readFileSync(filePath, "utf-8");
export const data = JSON.parse(jsonString);

export function generirajObiteljiPoMjestu(data, rod) {
  if (rod == null) rod = "Bosna";

  // Sakupi samo mjesta iz atributa MJESTO
  const mjestaSet = new Set();

  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    mjestaSet.add(o.MJESTO.trim());
  }

  const mjesta = Array.from(mjestaSet);

  // Za svako mjesto, obitelji koje su tu živjele ili migrirale u to mjesto
  const mapaMjesta = {};

  for (const mjesto of mjesta) {
    mapaMjesta[mjesto] = data
      .filter(o =>
        o.ROD === rod &&
        o.OBITELJ &&
        (
          (o.MJESTO && o.MJESTO.trim() === mjesto) ||
          (o.MIGRACIJA && o.MIGRACIJA.split(/[,;]/).map(s => s.trim()).includes(mjesto))
        )
      )
      .map(o => ({
        name: o.OBITELJ,
        path: `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`
      }));
  }

  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: mjesto,
    pages: obitelji
  }));
}

export function generirajMjestaOdObitelji(obitelji, rod) {
    if (rod == null) rod = "Bosna";

    const mjestaMap = new Map();
    const obitelj_m = obitelji.filter(o => o.TIP === "M" && o.ROD === rod && o.OBITELJ);

    // Prvo sakupi sva mjesta iz MJESTO
    const mjestaSet = new Set();
    for (const o of obitelj_m) {
        if (o.MJESTO) {
            mjestaSet.add(o.MJESTO.trim());
        }
    }

    // Za svako mjesto, pronađi najstariju GODINU (iz MJESTO ili MIGRACIJA)
    for (const mjesto of mjestaSet) {
        let najstarijaGodina = null;

        for (const o of obitelj_m) {
            const godina = parseInt(o.GODINA);
            if (!isFinite(godina)) continue;

            const migracije = (o.MIGRACIJA || "").split(/[,;]/).map(s => s.trim());

            const mjestoMatch =
                (o.MJESTO && o.MJESTO.trim() === mjesto) ||
                migracije.includes(mjesto);

            if (mjestoMatch) {
                if (najstarijaGodina == null || godina < najstarijaGodina) {
                    najstarijaGodina = godina;
                }
            }
        }

        if (najstarijaGodina != null) {
            mjestaMap.set(mjesto, najstarijaGodina);
        }
    }

    // Vrati sortirano po godini
    return Array.from(mjestaMap.entries())
        .sort((a, b) => a[1] - b[1])
        .map(([mjesto, godina]) => ({
            name: `${godina}. ${mjesto}`,
            path: `/pages/ENTITET/mjesto/${encodeURIComponent(mjesto)}`
        }));
}

