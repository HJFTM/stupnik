import { CURRENT_PROJECT, data, generirajObiteljiPoMjestu, generirajMjestaOdObitelji } from "./observablehq.base.js";

const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(data, CURRENT_PROJECT);
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const rodEntitetiIzvoriPages = [
  {
    name: `Rod (${CURRENT_PROJECT})`,
    pages: [
      { name: "Prezime", path: `/pages/1_Jularic/prezime_r?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Generacije", path: `/pages/ROD/Generacije_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Obitelji", path: `/pages/ROD/Obitelji_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Stablo", path: `/pages/ROD/Stablo_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
    ]
  },
  {
    name: "Mjesta",
    pages: [
      { name: "Mjesta", path: `/pages/ROD/Mjesta_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      { name: "Mjesta-zapisi", path: `/pages/KONCEPT/Mjesta_zapisi_R?ROD=${encodeURIComponent(CURRENT_PROJECT)}` },
      ...mjestaPages,
    ]
  },
  //...obiteljiPoMjestuPages
];
