import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./observablehq.uvod.js";
import { getRodEntitetiIzvoriPages } from "./observablehq.rodovi.js"; // ⬅️ koristi dinamičku funkciju

import { obiteljiPages } from "./observablehq.obitelji.js";
import { mjestaPages } from "./observablehq.mjesta.js";
import { izvoriPages } from "./menu.izvori.js";


let pages;

if (CURRENT_PROJECT === "Uvod") {
  pages = uvodPages;
} else if (CURRENT_PROJECT === "Obitelji") {
  pages = obiteljiPages;
} else if (CURRENT_PROJECT === "izvori") {
  pages = izvoriPages;
} else {
  pages = getRodEntitetiIzvoriPages(CURRENT_PROJECT, data);
}

// 2️⃣ Entry points = sve stranice koje želimo da se statički izgrade
const entryPoints = [
  ...pages.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  ...mjestaPages.map(p => p.path)
];

// 3️⃣ Dinamičke rute za obitelji (npr. [obitelj].md stranice)
const dynamicPaths = () => {
  return data
    .filter(o => o.ROD === CURRENT_PROJECT && o.OBITELJ)
    .flatMap(o => [
      `/pages/${CURRENT_PROJECT}/obitelj/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/${CURRENT_PROJECT}/obitelj_geo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/${CURRENT_PROJECT}/obitelj_stablo/${encodeURIComponent(o.OBITELJ)}`,
      `/pages/${CURRENT_PROJECT}/obitelj_zapis/${encodeURIComponent(o.OBITELJ)}`
    ]);
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
