
import { 
  CURRENT_PROJECT, data, 
  generirajObiteljiPoMjestu, 
  generirajObiteljiGEOpoMjestu,
  generirajObiteljiZapis,
  generirajObiteljiStablo} 
from "./observablehq.base.js";



const obiteljiBH = generirajObiteljiPoMjestu(data, "Bosna");
const obiteljiST = generirajObiteljiPoMjestu(data, "Stupnik");
const obiteljiDU = generirajObiteljiPoMjestu(data, "Dubrovnik");

const obiteljiGEOBH = generirajObiteljiGEOpoMjestu(data, "Bosna");
const obiteljiGEOST = generirajObiteljiGEOpoMjestu(data, "Stupnik");
const obiteljiGEODU = generirajObiteljiGEOpoMjestu(data, "Dubrovnik");

const obiteljiZapisBH = generirajObiteljiZapis(data, "Bosna");
const obiteljiZapisST = generirajObiteljiZapis(data, "Stupnik");
const obiteljiZapisDU = generirajObiteljiZapis(data, "Dubrovnik");

const obiteljiStabloBH = generirajObiteljiStablo(data, "Bosna");
const obiteljiStabloST = generirajObiteljiStablo(data, "Stupnik");
const obiteljiStabloDU = generirajObiteljiStablo(data, "Dubrovnik");

/*
//  ...obiteljiGEOBH, ...obiteljiGEOST, ...obiteljiGEODU,
//  ...obiteljiStabloBH, ...obiteljiStabloST, ...obiteljiStabloDU,
//  ...obiteljiZapisBH, ...obiteljiZapisST, ...obiteljiZapisDU,
*/
export const obiteljiPages = [
  ...obiteljiBH, ...obiteljiST, ...obiteljiDU,

  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];
