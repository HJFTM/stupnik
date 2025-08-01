
import { 
  generirajMjestaOdObitelji,
  generirajMjestaOdObiteljiSVE } 
from "./observablehq.base.js";




const obiteljiBH = generirajMjestaOdObiteljiSVE(data, "Bosna");
const obiteljiST = generirajMjestaOdObiteljiSVE(data, "Stupnik");
const obiteljiDU = generirajMjestaOdObiteljiSVE(data, "Dubrovnik");


// Test
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiBH, ...obiteljiST, ...obiteljiDU,

  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];

