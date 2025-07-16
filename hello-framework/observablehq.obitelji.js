
import { CURRENT_PROJECT, data, generirajObiteljiPoMjestu, generirajMjestaOdObitelji } from "./observablehq.base.js";

const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(data, "Bosna");
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
   {
    name: "Uvod",
    pages: [
      { name: "Naslovnica", path: "/pages/0 Uvod/naslovnica" },
      { name: "Uvod", path: "/pages/0 Uvod/uvod" },
      { name: "Događaji", path: "/pages/0 Uvod/dogadjaji" }
    ]
  },
  ...obiteljiPoMjestuPages
];
