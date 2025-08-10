import {data} from "./observablehq.base.js";
console.log("menu.izvor.js - typeof data:", typeof data);
console.log("menu.izvor.js - Array.isArray(data):", Array.isArray(data));

// Generiraj Zupe po Drzavama
const zupeBH = generirajZupePoRodovima(data, "Bosna");
const zupeAU = generirajZupePoRodovima(data, "Austrougarska");
const zupeDU = generirajZupePoRodovima(data, "Dubrovačka Republika");

// ➕ Generiranje matica za sve rodove
const maticeBH = generirajMaticePoZupi(data, "Bosna");
const maticeST = generirajMaticePoZupi(data, "Stupnik");
const maticeDU = generirajMaticePoZupi(data, "Dubrovnik");
const matice_komusina = maticeBH.find(m => m.name ==  "Komušina");
const matice_sivsa = maticeBH.find(m => m.name ==  "Sivša");
const matice_pecnik = maticeBH.find(m => m.name ==  "Pećnik");

// 📦 Export struktura izvora, uključujući matice
export const izvoriPages = [
  {
    name: "Izvori",
    pages: [
      { name: "Izvori",    path: "/pages/KONCEPT/Izvori_K" },
      { name: "Crkveni",   path: "/pages/KONCEPT/Izvori_Crkveni" },
      { name: "Državni",   path: "/pages/KONCEPT/Izvori_Drzavni" },      
      { name: "Gradski",   path: "/pages/KONCEPT/Izvori_Gradski" },  
      { name: "Radovi",    path: "/pages/KONCEPT/Izvori_Radovi" },
      { name: "Groblja",   path: "/pages/KONCEPT/Izvori_Groblja" },  
      { name: "Pismo",     path: "/pages/KONCEPT/Pismo_K" }
    ]
  },
  {
    name: "Događaji - Zapisi",
    pages: [   
      { name: "Matice",         path: "/pages/KONCEPT/Izvori_zapisi_K" },
      { name: "Kućedomaćini",   path: "/pages/KONCEPT/Kucedomacin_K" },
      { name: "Katastar",       path: "/pages/KONCEPT/Katastar_K" },
      { name: "Stanovnici",     path: "/pages/KONCEPT/Popis_stanovnika_K" }
    ]
  },       

  zupeBH, 
  zupeAU, 
  zupeDU,
];


// 🔁 Funkcija za generiranje matica po župi
// 🔁 Župe po ROD-u, s name = "NAZIV (minGodina)" i sort po minGodina ↑
function generirajZupePoRodovima(dataCombined, rod = "Bosna") {
  const zupeArr = (dataCombined.župe ?? dataCombined.zupe ?? []).filter(Boolean);
  const zupe   = dataCombined.župe ?? [];

  // helper: min/max za jednu ZUPA iz opis_e
  const minMaxForZupa = (zupaId) => {
    const rel = zupe.filter(o => o.ZUPA === zupaId);
    const mins = rel.map(o => Number(o.GODINA ?? o.GODINA)).filter(g => Number.isFinite(g) && g > 0);
    const maxs = rel.map(o => Number(o.GODINA ?? o.GODINA)).filter(g => Number.isFinite(g) && g > 0);
    const minG = mins.length ? Math.min(...mins) : undefined;
    const maxG = maxs.length ? Math.max(...maxs) : undefined;
    return { minG, maxG };
  };

  const src = zupeArr
    .filter(z => z.RELEVANT === true)
    .filter(z => z.ZUPA && String(z.ZUPA).trim() !== "")
    .filter(z => z.NAZIV && String(z.NAZIV).trim() !== "");

  const filtrirano = rod ? src.filter(z => (z.DRZAVA && String(z.DRZAVA).trim() === rod)) : src;

  // 1) Grupiraj po NAZIV
  const groups = new Map(); // NAZIV -> array of entries
  for (const z of filtrirano) {
    const naziv = String(z.NAZIV).trim();
    if (!groups.has(naziv)) groups.set(naziv, []);
    groups.get(naziv).push(z);
  }

  // 2) Za svaku grupu (NAZIV) izračunaj ukupni min/max i odaberi ZUPA s najvećim maxGodina
  const items = [];
  for (const [naziv, arr] of groups.entries()) {
    let overallMin = undefined;
    let overallMax = undefined;
    let chosenZupa = undefined;
    let chosenMax  = -1;

    for (const z of arr) {
      const zupaId = String(z.ZUPA).trim();
      const { minG, maxG } = minMaxForZupa(zupaId);

      if (Number.isFinite(minG)) {
        overallMin = Number.isFinite(overallMin) ? Math.min(overallMin, minG) : minG;
      }
      if (Number.isFinite(maxG)) {
        overallMax = Number.isFinite(overallMax) ? Math.max(overallMax, maxG) : maxG;
      }
      const candidateMax = Number.isFinite(maxG) ? maxG : (Number.isFinite(minG) ? minG : -1);
      if (candidateMax > chosenMax) {
        chosenMax = candidateMax;
        chosenZupa = zupaId;
      }
    }

    // fallback: ako ništa nije imalo godine, uzmi prvu ZUPA
    if (!chosenZupa && arr.length) chosenZupa = String(arr[0].ZUPA).trim();

    items.push({
      naziv,
      value: naziv,             // lista je po NAZIV
      zupaLink: chosenZupa,     // link ide na ZUPA s najvećim maxGodina
      minGodina: Number.isFinite(overallMin) ? overallMin : undefined,
      maxGodina: Number.isFinite(overallMax) ? overallMax : undefined,
      drzava: arr[0]?.DRZAVA
    });
  }

  // 3) Mapiraj u pages + sortiraj po minGodina ↑, potom po nazivu
  const pages = items
    .map(it => {
      const name  = it.minGodina ? `${it.minGodina}. ${it.naziv}` : it.naziv;
      const label = it.maxGodina ? `${it.naziv} (do ${it.maxGodina})` : it.naziv;
      const path  = `/pages/ENTITET/zupa/${encodeURIComponent(it.zupaLink)}`;

      return {
        name, label,
        value: it.value, // NAZIV
        path,
        pathEncoded2: `/pages/ENTITET/zupa/${encodeURIComponent(encodeURIComponent(it.zupaLink))}`,
        minGodina: it.minGodina,
        maxGodina: it.maxGodina,
        drzava: it.drzava
      };
    })
    .sort((a, b) =>
      ((Number.isFinite(a.minGodina) ? a.minGodina : Infinity) -
       (Number.isFinite(b.minGodina) ? b.minGodina : Infinity)) ||
      a.name.localeCompare(b.name, "hr", { sensitivity: "base" })
    );

  return { name: rod, pages };
}

export function generirajMaticePoZupi(dataCombined, rod = "Bosna") {
  const matice = (dataCombined.matice ?? [])
    .filter(m => m.UID && m.UID != null)
    .filter(m => m.GODINA_OD < 1900);

  const zupeSet = new Set();

  for (const m of matice) {
    if (!m.ROD || m.ROD !== rod || !m.ZUPA) continue;
    zupeSet.add(m.ZUPA.trim());
  }

  const zupe = Array.from(zupeSet);
  const mapaZupa = {};

  for (const zupa of zupe) {
    mapaZupa[zupa] = matice
      .filter(z =>
        z.ROD === rod &&
        z.ZUPA &&
        z.ZUPA.trim() === zupa
      )
      .sort((a, b) => {
        const aGodina = parseInt(a.GODINA_OD) || 9999;
        const bGodina = parseInt(b.GODINA_OD) || 9999;
        return aGodina - bGodina;
      })
      .map(z => ({
        name: z.UID,
        path: `/pages/ENTITET/matica/${encodeURIComponent(z.UID)}`,
        pathEncoded2: `/pages/ENTITET/matica/${encodeURIComponent(encodeURIComponent(z.UID))}`,
        geo_path: `/pages/ENTITET/matica_geo/${encodeURIComponent(z.UID)}`,
        geo_pathEncoded2: `/pages/ENTITET/matica_geo/${encodeURIComponent(encodeURIComponent(z.UID))}`
      }));
  }

  return Object.entries(mapaZupa).map(([zupa, matice]) => ({
    name: zupa,
    pages: matice
  }));
}

