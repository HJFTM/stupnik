import {data} from "./observablehq.base.js";

// 🔁 Funkcija za generiranje matica po župi
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
export const zapisiPages = [
   

  matice_komusina,
  matice_sivsa,
  maticeBH.find(m => m.name ==  "Plehan"),
  maticeBH.find(m => m.name ==  "Koraće"),  
  maticeBH.find(m => m.name ==  "Podvučjak"),  
  maticeBH.find(m => m.name ==  "Potočani"),    
  matice_pecnik,  
  //maticeBH,
  ...maticeST,
  ...maticeDU
];

// 🔁 Funkcija za generiranje župa po DRZAVAMA (ZUPA.DRZAVA)
function generirajZupePoRodovima(dataCombined, rod = "Bosna") {
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
