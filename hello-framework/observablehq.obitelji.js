
import { 
  CURRENT_PROJECT, data, 
  generirajObiteljiPoMjestu, 
  generirajObiteljiGEOpoMjestu,
  generirajObiteljiZapis,
  generirajObiteljiStablo,
  generirajMjestaOdObitelji } 
from "./observablehq.base.js";




const obiteljiBH = generirajObiteljiPoMjestu(data, "Bosna");
const obiteljiST = generirajObiteljiPoMjestu(data, "Stupnik");
const obiteljiDU = generirajObiteljiPoMjestu(data, "Dubrovnik");
const obiteljiGEO = generirajObiteljiGEOpoMjestu(data, "Obitelji");
const obiteljiZapis = generirajObiteljiZapis(data, "Obitelji");
const obiteljiStablo = generirajObiteljiStablo(data, "Obitelji");

// Test
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiBH,
  ...obiteljiST,
  ...obiteljiDU,
  ...obiteljiGEO,
  ...obiteljiStablo,
  ...obiteljiZapis,
  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];
