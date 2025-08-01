
import {
  CURRENT_PROJECT, data, 
  generirajMjestaOdObitelji
} 
from "./observablehq.base.js";




const mjestaBH = generirajMjestaOdObiteljiSVE(data, "Bosna");
const mjestaST = generirajMjestaOdObiteljiSVE(data, "Stupnik");
const mjestaDU = generirajMjestaOdObiteljiSVE(data, "Dubrovnik");


// Test
const mjestaPagesTest = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const mjestaPages = [
  ...mjestaBH, ...mjestaST, ...mjestaDU,

  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];

function generirajMjestaOdObiteljiSVE(obitelji, rod = "Bosna") {
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
    { label: "Migracije", dir: "mjesto_migracije" },
    { label: "Zapisi", dir: "mjesto_zapisi" },
    { label: "Obitelji", dir: "mjesto_obitelji" },
    { label: "Župe", dir: "mjesto_zupe" }
  ];

  // Generiraj sve stranice
  const stranice = [];

  for (const [mjesto, godina] of Array.from(mjestaMap.entries()).sort((a, b) => a[1] - b[1])) {
    for (const { label, dir } of kategorije) {
      stranice.push({
        name: `${godina}. ${mjesto}`,
        path: `/pages/ENTITET/${dir}/${encodeURIComponent(mjesto)}`
      });
    }
  }

  return stranice;
}

