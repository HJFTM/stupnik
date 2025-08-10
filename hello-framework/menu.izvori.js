import {data} from "./observablehq.base.js";
console.log("menu.izvor.js - typeof data:", typeof data);
console.log("menu.izvor.js - Array.isArray(data):", Array.isArray(data));

// 🔁 Funkcija za generiranje matica po župi
function generirajZupePoRodovima(dataCombined, rod = "Bosna") {
  const zupeArr = (dataCombined.župe ?? dataCombined.zupe ?? []).filter(Boolean);
  const opisi   = dataCombined.opis_e ?? [];

  const src = zupeArr
    .filter(z => z.RELEVANT === true)
    .filter(z => z.ZUPA && String(z.ZUPA).trim() !== "")
    .filter(z => z.NAZIV && String(z.NAZIV).trim() !== "");

  const filtrirano = rod
    ? src.filter(z => (z.DRZAVA && String(z.DRZAVA).trim() === rod))
    : src;

  const mapByNaziv = new Map();
  for (const z of filtrirano) {
    const naziv = String(z.NAZIV).trim();
    if (!mapByNaziv.has(naziv)) {
      const related = opisi.filter(o => o.ZUPA === z.ZUPA);

      const maxGodina = related.length
        ? Math.max(...related.map(o => o.GODINA_DO ?? o.GODINA ?? 0))
        : 0;

      const minGodina = related.length
        ? Math.min(
            ...related
              .map(o => o.GODINA ?? o.GODINA_DO ?? Infinity)
              .filter(g => Number.isFinite(g) && g > 0)
          )
        : undefined;

      mapByNaziv.set(naziv, {
        naziv,
        zupa: String(z.ZUPA).trim(),
        drzava: z.DRZAVA,
        minGodina: minGodina && minGodina !== Infinity ? minGodina : undefined,
        maxGodina: Number.isFinite(maxGodina) && maxGodina > 0 ? maxGodina : undefined
      });
    }
  }

  const pages = Array.from(mapByNaziv.values())
    .map(it => {
      const name =
        it.minGodina ? `${it.naziv} (${it.minGodina})` : it.naziv; // ⬅️ sada min godina
      const label =
        it.maxGodina ? `${it.naziv} (do ${it.maxGodina})` : it.naziv;

      const path = `/pages/ENTITET/zupa/${encodeURIComponent(it.zupa)}`;

      return {
        name,
        label,
        value: it.zupa,
        path,
        pathEncoded2: `/pages/ENTITET/zupa/${encodeURIComponent(encodeURIComponent(it.zupa))}`,
        minGodina: it.minGodina,
        maxGodina: it.maxGodina,
        drzava: it.drzava
      };
    })
    .sort((a, b) =>
      a.label.localeCompare(b.label, "hr", { sensitivity: "base" })
    );

  return { name: rod, pages };
}


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

  zupeBH, zupeAU, zupeDU,
  // matice_komusina,
  // matice_sivsa,
  // maticeBH.find(m => m.name ==  "Plehan"),
  // maticeBH.find(m => m.name ==  "Koraće"),  
  // maticeBH.find(m => m.name ==  "Podvučjak"),  
  //maticeBH.find(m => m.name ==  "Potočani"),    
  //matice_pecnik,  
  //maticeBH,
  //...maticeST,
  //...maticeDU
];

// 🔁 Funkcija za generiranje župa po DRZAVAMA (ZUPA.DRZAVA)
function generirajZupePoRodovima_old(dataCombined, rod = "Bosna") {
  const src = (dataCombined.župe ?? dataCombined.zupe ?? [])
    .filter(z => z && z.ZUPA && String(z.ZUPA).trim() !== "")
    .filter(z => z.RELEVANT === true);

  // Filtriraj po DRZAVA
  const filtrirano = rod
    ? src.filter(z => z.DRZAVA && String(z.DRZAVA).trim() === rod)
    : src;

  // Unikatne župe po nazivu
  const zupeSet = new Set(filtrirano.map(z => String(z.ZUPA).trim()));

  const zupe = Array.from(zupeSet).sort((a, b) =>
    a.localeCompare(b, "hr", { sensitivity: "base" })
  );

  // Vratiti jedan objekt: { name: rod, pages: [...] }
  return {
    name: rod, 
    pages: zupe.map(zupa => ({
      name: zupa,
      path: `/pages/ENTITET/zupa/${encodeURIComponent(zupa)}`,
      pathEncoded2: `/pages/ENTITET/zupa/${encodeURIComponent(encodeURIComponent(zupa))}`,
    }))
  };
}

/**
 * Generira listu župa po ROD-u/DRŽAVI s labelom "(do maxGodina)",
 * deduplicirano po NAZIV (kao u Observable zupa_list).
 *
 * @param {Object} dataCombined  - { župe|zupe, opis_e, ... }
 * @param {String} rod           - npr. "Bosna" | "Stupnik" | "Dubrovnik"
 * @returns {{ name: string, pages: Array<{name:string,label:string,value:string,path:string,pathEncoded2:string,godina?:number,maxGodina?:number,drzava?:string}> }}
 */
function generirajZupePoRodovima(dataCombined, rod = "Bosna") {
  const zupeArr = (dataCombined.župe ?? dataCombined.zupe ?? []).filter(Boolean);
  const opisi   = dataCombined.opis_e ?? [];

  // 1) Izvor: ZUPE relevantne i s punim podacima
  const src = zupeArr
    .filter(z => z.RELEVANT === true)
    .filter(z => z.ZUPA && String(z.ZUPA).trim() !== "")
    .filter(z => z.NAZIV && String(z.NAZIV).trim() !== "");

  // 2) Filtriraj po DRZAVA (ako je zadano)
  const filtrirano = rod ? src.filter(z => (z.DRZAVA && String(z.DRZAVA).trim() === rod)) : src;

  // 3) Mapiraj po NAZIV (deduplikacija), uz izračun maxGodina iz opis_e po ZUPA
  //    Ako postoji više zapisa s istim NAZIV-om, zadrži prvi (ili po potrebi implementiraj logiku prioriteta)
  const mapByNaziv = new Map();
  for (const z of filtrirano) {
    const naziv = String(z.NAZIV).trim();
    if (!mapByNaziv.has(naziv)) {
      // Nađi maksimalnu godinu iz opis_e za ovu ZUPA
      const related = opisi.filter(o => o.ZUPA === z.ZUPA);
      const maxGodina = related.length
        ? Math.max(
            ...related.map(o => {
              const g = o.GODINA_DO ?? o.GODINA ?? 0;
              return Number.isFinite(g) ? g : 0;
            })
          )
        : 0;

      mapByNaziv.set(naziv, {
        naziv,
        zupa: String(z.ZUPA).trim(),
        drzava: z.DRZAVA,
        godina: z.GODINA,
        maxGodina: Number.isFinite(maxGodina) && maxGodina > 0 ? maxGodina : undefined
      });
    }
  }

  // 4) Pretvori u sortirani niz po labelu (hr)
  const pages = Array.from(mapByNaziv.values())
    .map(it => {
      const label =
        it.maxGodina ? `${it.naziv} (do ${it.maxGodina})` : it.naziv;

      const path = `/pages/ENTITET/zupa/${encodeURIComponent(it.zupa)}`;

      return {
        name: it.naziv,            // prikazni naziv
        label,                     // s "(do ...)"
        value: it.zupa,            // vrijednost (ID ZUPA) – ekvivalent Observable value
        path,                      // canonical path
        pathEncoded2: `/pages/ENTITET/zupa/${encodeURIComponent(encodeURIComponent(it.zupa))}`,
        godina: it.godina,
        maxGodina: it.maxGodina,
        drzava: it.drzava
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "hr", { sensitivity: "base" }));

  return { name: rod, pages };
}

