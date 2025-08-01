
import { 
  generirajMjestaOdObitelji,
  generirajMjestaOdObiteljiSVE } 
from "./observablehq.base.js";




const mjestaBH = generirajMjestaOdObiteljiSVE(data, "Bosna");
const mjestaST = generirajMjestaOdObiteljiSVE(data, "Stupnik");
const mjestaDU = generirajMjestaOdObiteljiSVE(data, "Dubrovnik");


// Test
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const mjestaPages = [
  ...mjestaBH, ...mjestaST, ...mjestaDU,

  
  {
    name: "------",
    pages: [
      { name: "Sadržaj", path: "/pages/KONCEPT/Navigacija" }
    ]
  }
];

