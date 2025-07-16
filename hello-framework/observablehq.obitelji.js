
import { CURRENT_PROJECT, data, generirajObiteljiPoMjestu, generirajMjestaOdObitelji } from "./observablehq.base.js";

const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(data, "Bosna");
const mjestaPages = generirajMjestaOdObitelji(data, CURRENT_PROJECT);

export const obiteljiPages = [
  ...obiteljiPoMjestuPages
];
