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
const dataPath = path.resolve(__dirname, "src/data/obitelji.json");

let data = [];
if (fs.existsSync(dataPath)) {
  const jsonString = fs.readFileSync(dataPath, "utf-8");
  data = JSON.parse(jsonString);
} else {
  console.warn(`⚠️ Datoteka nije pronađena: ${dataPath}`);
}

export { data };
export function generirajObiteljiPoMjestu(data, rod = "Bosna") {
  const mjestaSet = new Set();

  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    mjestaSet.add(o.MJESTO.trim());
  }

  const mjesta = Array.from(mjestaSet);
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
        path: `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`,
        pathEncoded2: `/pages/ENTITET/obitelj/${encodeURIComponent(encodeURIComponent(o.OBITELJ))}`,
        geo_path: `/pages/ENTITET/obitelj_geo/${encodeURIComponent(o.OBITELJ)}`,
        geo_pathEncoded2: `/pages/ENTITET/obitelj_geo/${encodeURIComponent(encodeURIComponent(o.OBITELJ))}`
        
      }));
  }

  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: mjesto,
    pages: obitelji
  }));
}

export function generirajObiteljiGEOpoMjestu(data, rod = "Bosna") {
  const mjestaSet = new Set();

  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    mjestaSet.add(o.MJESTO.trim());
  }

  const mjesta = Array.from(mjestaSet);
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
        path: `/pages/ENTITET/obitelj_geo/${encodeURIComponent(o.OBITELJ)}`,
        pathEncoded2: `/pages/ENTITET/obitelj_geo/${encodeURIComponent(encodeURIComponent(o.OBITELJ))}`
        
      }));
  }

  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: mjesto,
    pages: obitelji
  }));
}
export function generirajObiteljiZapis(data, rod = "Bosna") {
  const mjestaSet = new Set();

  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    mjestaSet.add(o.MJESTO.trim());
  }

  const mjesta = Array.from(mjestaSet);
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
        path: `/pages/ENTITET/obitelj_zapis/${encodeURIComponent(o.OBITELJ)}`,
        pathEncoded2: `/pages/ENTITET/obitelj_zapis/${encodeURIComponent(encodeURIComponent(o.OBITELJ))}`
        
      }));
  }

  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: mjesto,
    pages: obitelji
  }));
}
export function generirajObiteljiStablo(data, rod = "Bosna") {
  const mjestaSet = new Set();

  for (const o of data) {
    if (!o.ROD || o.ROD !== rod || !o.MJESTO || !o.OBITELJ) continue;
    mjestaSet.add(o.MJESTO.trim());
  }

  const mjesta = Array.from(mjestaSet);
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
        path: `/pages/ENTITET/obitelj_stablo/${encodeURIComponent(o.OBITELJ)}`,
        pathEncoded2: `/pages/ENTITET/obitelj_stablo/${encodeURIComponent(encodeURIComponent(o.OBITELJ))}`
        
      }));
  }

  return Object.entries(mapaMjesta).map(([mjesto, obitelji]) => ({
    name: mjesto,
    pages: obitelji
  }));
}
export function generirajMjestaOdObitelji(obitelji, rod = "Bosna") {
  const mjestaMap = new Map();
  const obitelj_m = obitelji.filter(o => o.TIP === "M" && o.ROD === rod && o.OBITELJ);

  const mjestaSet = new Set();
  for (const o of obitelj_m) {
    if (o.MJESTO) mjestaSet.add(o.MJESTO.trim());
  }

  for (const mjesto of mjestaSet) {
    let najstarijaGodina = null;

    for (const o of obitelj_m) {
      const godina = parseInt(o.GODINA);
      if (!isFinite(godina)) continue;

      const migracije = (o.MIGRACIJA || "").split(/[,;]/).map(s => s.trim());
      const mjestoMatch = (o.MJESTO && o.MJESTO.trim() === mjesto) || migracije.includes(mjesto);

      if (mjestoMatch && (najstarijaGodina == null || godina < najstarijaGodina)) {
        najstarijaGodina = godina;
      }
    }

    if (najstarijaGodina != null) {
      mjestaMap.set(mjesto, najstarijaGodina);
    }
  }

  return Array.from(mjestaMap.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([mjesto, godina]) => ({
      name: `${godina}. ${mjesto}`,
      path: `/pages/ENTITET/mjesto/${encodeURIComponent(mjesto)}`
    }));
}

export function generirajMjestaOdObiteljiSVE(obitelji, rod = "Bosna") {
  const obitelj_m = obitelji.filter(o => o.TIP === "M" && o.ROD === rod && o.OBITELJ);
  const mjestaSet = new Set();

  // Skupi jedinstvena mjesta iz glavnog mjesta i migracija
  for (const o of obitelj_m) {
    if (o.MJESTO) mjestaSet.add(o.MJESTO.trim());

    const migracije = (o.MIGRACIJA || "").split(/[,;]/).map(s => s.trim());
    for (const migracija of migracije) {
      if (migracija) mjestaSet.add(migracija);
    }
  }

  // Nađi najstariju godinu za svako mjesto
  const mjestaMap = new Map();

  for (const mjesto of mjestaSet) {
    let najstarijaGodina = null;

    for (const o of obitelj_m) {
      const godina = parseInt(o.GODINA);
      if (!isFinite(godina)) continue;

      const migracije = (o.MIGRACIJA || "").split(/[,;]/).map(s => s.trim());
      const mjestoMatch = (o.MJESTO && o.MJESTO.trim() === mjesto) || migracije.includes(mjesto);

      if (mjestoMatch && (najstarijaGodina == null || godina < najstarijaGodina)) {
        najstarijaGodina = godina;
      }
    }

    if (najstarijaGodina != null) {
      mjestaMap.set(mjesto, najstarijaGodina);
    }
  }

  // Definiraj stranice po temama
  const kategorije = [
    { label: "Migracije", dir: "mjesta_migracije" },
    { label: "Zapisi", dir: "mjesta_zapisi" },
    { label: "Obitelji", dir: "mjesta_obitelji" },
    { label: "Župe", dir: "mjesta_zupe" }
  ];

  // Generiraj sve stranice
  const stranice = [];

  for (const [mjesto, godina] of Array.from(mjestaMap.entries()).sort((a, b) => a[1] - b[1])) {
    for (const { label, dir } of kategorije) {
      stranice.push({
        name: `${godina}. ${mjesto} – ${label}`,
        path: `/${dir}/${encodeURIComponent(mjesto)}`
      });
    }
  }

  return stranice;
}

