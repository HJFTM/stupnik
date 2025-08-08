import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./menu.uvod.js";

import { getRodEntitetiIzvoriPages } from "./menu.rodovi.js"; // ⬅️ koristi dinamičku funkciju
import { obiteljiPages, obiteljiPagesAll} from "./menu.obitelji.js";
import { mjestaPages } from "./menu.mjesta.js";
 import { izvoriPages } from "./menu.izvori.js";

console.log("hello-framework/observablehq.config.js - typeof data:", typeof data);
console.log("hello-framework/observablehq.config.js - Array.isArray(data):", Array.isArray(data));
console.log("hello-framework/observablehq.config.js - data.obitelji:", data.obitelj.length);

let pages;

pages = uvodPages;

if (CURRENT_PROJECT === "Uvod") {
  pages = uvodPages;
} else if (CURRENT_PROJECT === "Obitelji") {
 pages = obiteljiPages;
} else if (CURRENT_PROJECT === "izvori") {
  pages = izvoriPages;
} else {
  pages = getRodEntitetiIzvoriPages(CURRENT_PROJECT, data.obitelj);
}

// 2️⃣ Entry points = sve stranice koje želimo da se statički izgrade
const entryPoints = [
  ...pages.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  ...mjestaPages.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  ...obiteljiPagesAll.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  
  // Ručno dodajemo i [obitelj] podstranice
  data.obitelj
    .filter(o => o.OBITELJ && o.OBITELJ != null)
    .flatMap(o => [
      `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_geo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_stablo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_zapis/${encodeURIComponent(o.OBITELJ)}`
    ]),
    // Ručno dodajemo i [obitelj] podstranice
  data.obitelj
    .filter(o => o.MJESTO && o.MJESTO != null)
    .flatMap(o => [
      `/pages/ENTITET/mjesto/${encodeURIComponent(o.MJESTO)}`,
      `/pages/ENTITET/mjesto_zupe/${encodeURIComponent(o.MJESTO)}`,
      `/pages/ENTITET/mjesto_migracije/${encodeURIComponent(o.MJESTO)}`,
      `/pages/ENTITET/mjesto_obitelji/${encodeURIComponent(o.MJESTO)}`,
      `/pages/ENTITET/mjesto_zapisi/${encodeURIComponent(o.MJESTO)}`
    ])
];

// 3️⃣ Dinamičke rute za obitelji (npr. [obitelj].md stranice)
export const dynamicPaths = () => {
  return data.obitelj
    .filter(o => o.OBITELJ)
    .flatMap(o => [
      `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_geo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_stablo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/ENTITET/obitelj_zapis/${encodeURIComponent(o.OBITELJ)}`
    ])
    .concat(
      data.obitelj
        .filter(o => o.MJESTO)
        .flatMap(o => [
          `/pages/ENTITET/mjesto/${encodeURIComponent(o.MJESTO)}`,
          `/pages/ENTITET/mjesto_zupe/${encodeURIComponent(o.MJESTO)}`,
          `/pages/ENTITET/mjesto_migracije/${encodeURIComponent(o.MJESTO)}`,
          `/pages/ENTITET/mjesto_obitelji/${encodeURIComponent(o.MJESTO)}`,
          `/pages/ENTITET/mjesto_zapisi/${encodeURIComponent(o.MJESTO)}`
        ])
    );
};

// 4️⃣ Finalni config
export default {
  title: `${CURRENT_PROJECT}`,
  pages,
  entryPoints,
  dynamicPaths,
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src"
};
