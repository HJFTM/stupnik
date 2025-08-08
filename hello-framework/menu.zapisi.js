import {data} from "./observablehq.base.js";

// ➕ Generiranje matica za sve rodove
const maticeBH = generirajMaticePoZupi(data, "Bosna");
const maticeST = generirajMaticePoZupi(data, "Stupnik");
const maticeDU = generirajMaticePoZupi(data, "Dubrovnik");
// const matice_komusina = maticeBH.find(m => m.name ==  "Komušina");
// const matice_sivsa = maticeBH.find(m => m.name ==  "Sivša");
// const matice_pecnik = maticeBH.find(m => m.name ==  "Pećnik");

// 📦 Export struktura izvora, uključujući matice
export const zapisiPages = [
  // matice_komusina,
  // matice_sivsa,
  // maticeBH.find(m => m.name ==  "Plehan"),
  // maticeBH.find(m => m.name ==  "Koraće"),  
  // maticeBH.find(m => m.name ==  "Podvučjak"),  
  // maticeBH.find(m => m.name ==  "Potočani"),    
  // matice_pecnik,  
  ...maticeBH,
  ...maticeST,
  ...maticeDU
];

// 🔁 Funkcija za generiranje matica po župi
export function generirajMaticePoZupi(data, rod = "Bosna") {
  const matice = (data.zapisi_matice ?? [])
    .filter(m => m.MATICA && m.ROD === rod && m.ZUPA);

  const mapaZupa = {};

  for (const m of matice) {
    const zupa = m.ZUPA.trim();
    if (!mapaZupa[zupa]) mapaZupa[zupa] = [];
    mapaZupa[zupa].push(m);
  }

  // Pretvaramo u navigacijski format
  const rezultat = Object.entries(mapaZupa).map(([zupa, zapisi]) => ({
    name: `${zupa} (${zapisi.length})`,
    pages: zapisi
      .sort((a, b) => {
        const aGodina = parseInt(a.GODINA) || 9999;
        const bGodina = parseInt(b.GODINA) || 9999;
        return aGodina - bGodina;
      })
      .map(z => ({
        name: z.MATICA,
        path: `/pages/ENTITET/matica/${encodeURIComponent(z.MATICA)}`,
        geo_path: `/pages/ENTITET/matica_geo/${encodeURIComponent(z.MATICA)}`
      }))
  }));

  return rezultat;
}

