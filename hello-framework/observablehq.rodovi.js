import {
  generirajObiteljiPoMjestu,
  generirajMjestaOdObitelji
} from "./observablehq.base.js";

export function getRodEntitetiIzvoriPages(rod, data) {
  const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(data, rod);
  const mjestaPages = generirajMjestaOdObitelji(data, rod);

  return [
    {
      name: `Obitelji`,
      pages: [
        { name: "  Prezime",      path: `/pages/1_Jularic/prezime_r?ROD=${encodeURIComponent(rod)}` },
        { name: "  Generacije",   path: `/pages/ROD/Generacije_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Obitelji",     path: `/pages/ROD/Obitelji_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Događaji",     path: `/pages/ROD/Dogadjaji_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Stablo",       path: `/pages/ROD/Stablo_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Bolesti",      path: `/pages/ROD/Bolesti_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Mjesta",       path: `/pages/ROD/Mjesta_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Migracije",    path: `/pages/ROD/Migracije_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Izvori*",      path: `/pages/ROD/Izvori_D?ROD=${encodeURIComponent(rod)}` },
      ]
    },
    {
      name: "Mjesta",
      pages: [...mjestaPages]
    },
    {
      name: "Izvori",
      pages: [
        { name: "  Popisi",        path: `/pages/ROD/Izvor_Popisi?ROD=${encodeURIComponent(rod)}` },
        { name: "  Matice",        path: `/pages/ROD/Matice_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Groblje",       path: `/pages/ROD/Groblje_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Katastar",      path: `/pages/ROD/Katastar_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Pismo / Jezik", path: `/pages/ROD/Pismo_D?ROD=${encodeURIComponent(rod)}` },
      ]
    },
    {
      name: "----------",
      pages: [
        { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
      ]
    }
  ];
}
