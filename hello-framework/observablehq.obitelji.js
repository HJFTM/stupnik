
import { 
  CURRENT_PROJECT, data, 
  generirajObiteljiPoMjestu, 
  generirajObiteljiGEOpoMjestu,
  generirajObiteljiZapis,
  generirajObiteljiStablo} 
from "./observablehq.base.js";


import { 
  generirajMjestaOdObitelji,
  generirajMjestaOdObiteljiSVE } 
from "./observablehq.mjesta.js";


const obiteljiBH = generirajMjestaOdObiteljiSVE(data, "Bosna");
const obiteljiST = generirajMjestaOdObiteljiSVE(data, "Stupnik");
const obiteljiDU = generirajMjestaOdObiteljiSVE(data, "Dubrovnik");

const obiteljiGEOBH = generirajObiteljiGEOpoMjestu(data, "Bosna");
const obiteljiGEOST = generirajObiteljiGEOpoMjestu(data, "Stupnik");
const obiteljiGEODU = generirajObiteljiGEOpoMjestu(data, "Dubrovnik");

const obiteljiZapisBH = generirajObiteljiZapis(data, "Bosna");
const obiteljiZapisST = generirajObiteljiZapis(data, "Stupnik");
const obiteljiZapisDU = generirajObiteljiZapis(data, "Dubrovnik");

const obiteljiStabloBH = generirajObiteljiStablo(data, "Bosna");
const obiteljiStabloST = generirajObiteljiStablo(data, "Stupnik");
const obiteljiStabloDU = generirajObiteljiStablo(data, "Dubrovnik");

// Test
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiBH, ...obiteljiST, ...obiteljiDU,
  ...obiteljiGEOBH, ...obiteljiGEOST, ...obiteljiGEODU,
  ...obiteljiStabloBH, ...obiteljiStabloST, ...obiteljiStabloDU,
  ...obiteljiZapisBH, ...obiteljiZapisST, ...obiteljiZapisDU,
  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];
