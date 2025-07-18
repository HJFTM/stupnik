
import { CURRENT_PROJECT, data, generirajObiteljiPoMjestu, generirajMjestaOdObitelji } from "./observablehq.base.js";

const obiteljiBH = generirajObiteljiPoMjestu(data, "Bosna");
const obiteljiST = generirajObiteljiPoMjestu(data, "Stupnik");
const obiteljiDU = generirajObiteljiPoMjestu(data, "Dubrovnik");

const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiBH,
  ...obiteljiST,
  ...obiteljiDU,
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];
