

import { 
  CURRENT_PROJECT, data, 
  generirajObiteljiPoMjestu, 
  generirajObiteljiGEOpoMjestu,
  generirajObiteljiZapis,
  generirajObiteljiStablo} 
from "./observablehq.base.js";



const obiteljiBH = generirajObiteljiPoMjestu(data.obitelji, "Bosna");
const obiteljiST = generirajObiteljiPoMjestu(data.obitelji, "Stupnik");
const obiteljiDU = generirajObiteljiPoMjestu(data.obitelji, "Dubrovnik");

const obiteljiGEOBH = generirajObiteljiGEOpoMjestu(data.obitelji, "Bosna");
const obiteljiGEOST = generirajObiteljiGEOpoMjestu(data.obitelji, "Stupnik");
const obiteljiGEODU = generirajObiteljiGEOpoMjestu(data.obitelji, "Dubrovnik");

const obiteljiZapisBH = generirajObiteljiZapis(data.obitelji, "Bosna");
const obiteljiZapisST = generirajObiteljiZapis(data.obitelji, "Stupnik");
const obiteljiZapisDU = generirajObiteljiZapis(data.obitelji, "Dubrovnik");

const obiteljiStabloBH = generirajObiteljiStablo(data.obitelji, "Bosna");
const obiteljiStabloST = generirajObiteljiStablo(data.obitelji, "Stupnik");
const obiteljiStabloDU = generirajObiteljiStablo(data.obitelji, "Dubrovnik");

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

export const obiteljiPagesAll = [
  ...obiteljiBH, ...obiteljiST, ...obiteljiDU,
  ...obiteljiGEOBH, ...obiteljiGEOST, ...obiteljiGEODU,
  ...obiteljiStabloBH, ...obiteljiStabloST, ...obiteljiStabloDU,
  ...obiteljiZapisBH, ...obiteljiZapisST, ...obiteljiZapisDU
];
