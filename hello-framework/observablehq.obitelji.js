
import { 
  CURRENT_PROJECT, data, 
  generirajObiteljiPoMjestu, 
  generirajObiteljiGEOpoMjestu,
  generirajMjestaOdObitelji } 
from "./observablehq.base.js";




const obiteljiBH = generirajObiteljiPoMjestu(data, "Bosna");
const obiteljiST = generirajObiteljiPoMjestu(data, "Stupnik");
const obiteljiDU = generirajObiteljiPoMjestu(data, "Dubrovnik");
const obiteljiGEO = generirajObiteljiGEOpoMjestu(data, "Bosna");

// Test
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiBH,
  ...obiteljiST,
  ...obiteljiDU,
  ...obiteljiGEO,
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];
