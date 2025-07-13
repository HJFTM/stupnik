import fs from "fs";
import path from "path";

// REPOR VAIRABLE
// CURRENT_PROJECT = "Bosna", "Dubrovnik", "Stupnik", "svi_rodovi"

const CURRENT_PROJECT = process.env.CURRENT_PROJECT || 'NOT_FOUND';

// 1. Učitaj JSON datoteku odmah
const filePath = path.resolve("src/data/obitelji.json");
const jsonString = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(jsonString);

// 2. Uzmi obitelji iz data.json
const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(data, CURRENT_PROJECT);


export async function setup() {
  return {
    obitelji: data
  };
}


// Uvod i Jularić izbornik - za svi_rodovi
const uvodPages = [
  {
    name: "Uvod",
    pages: [
      { name: "Naslovnica", path: "/pages/0 Uvod/naslovnica" },
      { name: "Uvod", path: "/pages/0 Uvod/uvod" },
      { name: "Događaji", path: "/pages/0 Uvod/dogadjaji" }
    ]
  },
  {
    name: "Prezime",
      pages: [
        { name: "Prezime Jular-ić (K)", path: "/pages/1_Jularic/01.1.prezime_ilaric" },
        { name: "Evolucija zapisa (V)", path: "/pages/1_Jularic/01.2.evolucija" },
        { name: "Slična prezimena (K)", path: "/pages/1_Prezime/prezime_slicno" },
    ]
  },
  {
    name: "Obitelji",
      pages: [        
        { name: "Generacije (K)", path: "/pages/KONCEPT/Generacije_K" },
        { name: "Obitelji (K)", path: "/pages/KONCEPT/Obitelji_K" },
        { name: "Brakovi (K)", path: "/pages/KONCEPT/Brakovi_K" },
        { name: "Povezane obitelji (K)", path: "/pages/KONCEPT/Obitelji_povezane_K" },
        { name: "Događaji - zapisi (K)", path: "/pages/KONCEPT/Zapisi_K" },
        { name: "Bolesti (K)", path: "/pages/KONCEPT/Bolesti_K" },   
    ]
  },
  {
    name: "Države / Mjesta",
      pages: [        
        { name: "Države (K)",     path: "/pages/KONCEPT/Drzava_K" },
        { name: "Mjesta (K)",     path: "/pages/KONCEPT/Mjesta_K" },
        { name: "Migracije (K)",   path: "/pages/KONCEPT/Migracije_K" },
        { name: "Migracije (K)",   path: "/pages/KONCEPT/Migracije_masovne_K" },
        { name: "Kuće (K)",       path: "/pages/KONCEPT/Kucedomacin_K" },
        { name: "Groblje (K)",     path: "/pages/KONCEPT/Groblje_K" }
    ]
  },
  {
    name: "Izvori",
      pages: [        
        { name: "Popis stanovnika (K)", path: "/pages/KONCEPT/Popis_stanovnika_K" },

        { name: "Župe (K)", path: "/pages/KONCEPT/Zupe_K" },
        { name: "Izvori* (K)", path: "/pages/KONCEPT/Popisi_K" },
        { name: "Pismo (K)", path: "/pages/KONCEPT/Pismo_K" },


      ]
  }
];

// Rod, Entiteti i Izvori izbornici - za ostale (Bosna, Dubrovnik, Stupnik)
const rodEntitetiIzvoriPages = [
  {
    name: `Rod (${CURRENT_PROJECT})`,
    pages: [
      { name: "Prezime (R)",          path: `/pages/1_Jularic/prezime_r?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Generacije (R)",       path: `/pages/ROD/Generacije_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Obitelji (R)",         path: `/pages/ROD/Obitelji_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Stablo (R)",           path: `/pages/ROD/Stablo_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Zapisi (R)",           path: `/pages/ROD/Zapisi_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Migracije (R)",        path: `/pages/ROD/Migracije_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Mjesta (R)",           path: `/pages/ROD/Mjesta_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Mjesta-zapisi (R)",    path: `/pages/KONCEPT/Mjesta_zapisi_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Župe (R)",             path: `/pages/ROD/Zupe_D?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Župe Rodos. (R)",      path: `/pages/ROD/Zupe_rodoslovlje_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Župe Obitelji (R)",    path: `/pages/ROD/Zupe_obitelji_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Izvori* (D)",          path: `/pages/ROD/Popisi_D?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Pismo (D)",            path: `/pages/ROD/Pismo_D?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Bolesti (D)",          path: `/pages/ROD/Bolesti_D?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Groblje (D)",          path: `/pages/ROD/Groblje_D?ROD=${encodeURIComponent(CURRENT_PROJECT)}` }
    ]

  },
  ...obiteljiPoMjestuPages,
  {
    name: "Entiteti",
    pages: [
      { name: "Zapisi (E)", path: "/pages/ENTITET/Zapisi_E" },
      { name: "Mig. Ind. (E)", path: "/pages/ENTITET/Migracije_Individualne_E" },
      { name: "Masovne (E)", path: "/pages/ENTITET/Migracije_Masovne_E" },
      { name: "Kuće (E)", path: "/pages/ENTITET/Kucedomacin_E" },
      { name: "Mjesta (E)", path: "/pages/ENTITET/Mjesta_E" },
      { name: "Župe (E)", path: "/pages/ENTITET/Zupe_E" },
      { name: "Države (E)", path: "/pages/ENTITET/Drzava_E" },
      { name: "Izvori* (E)", path: "/pages/ENTITET/Popisi_E" },
      { name: "Pismo (E)", path: "/pages/ENTITET/Pismo_E" },
      { name: "Bolesti (E)", path: "/pages/ENTITET/Bolesti_E" },
      { name: "Groblje (E)", path: "/pages/ENTITET/Groblje_E" }
    ]
  },
  {
    name: "Izvori",
    pages: [
      { name: "Prezime (E)", path: "/pages/1_Jularic/01.3.prezime_e" },
      { name: "Katastar (K)", path: "/pages/KONCEPT/Katastar_K" },
      { name: "Katastar (D)", path: "/pages/ROD/Katastar_D" },
      { name: "Katastar (E)", path: "/pages/ENTITET/Katastar_E" },
      { name: "Izvori (K)", path: "/pages/KONCEPT/Izvori_K" },
      { name: "Izvori (D)", path: "/pages/ROD/Izvori_D" },
      { name: "Izvori (E)", path: "/pages/ENTITET/Izvori_E" }
    ]
  }
];

const pages = (CURRENT_PROJECT === 'svi_rodovi')
  ? uvodPages
  : rodEntitetiIzvoriPages;

export default {
  title: "Jularić",
  pages,
  dynamicPaths: () => {
    // ovdje možeš staviti logiku ako treba
  },
  
dynamicPaths: () => {
  return data
    .filter(o => o.ROD === "Bosna" && o.OBITELJ)
    .map(o => `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`);
},


  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src",
};

function generirajObiteljiPoMjestu(data, rod) {
  if (rod == null) rod = "Bosna"; // pokriva i null i undefined
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
    name: mjesto,
    pages: obitelji
  }));
}
