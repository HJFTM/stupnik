import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./observablehq.uvod.js";
import { getRodEntitetiIzvoriPages } from "./observablehq.rodovi.js"; // ⬅️ koristi dinamičku funkciju
import { obiteljiPages } from "./observablehq.obitelji.js";

let pages;

if (CURRENT_PROJECT === "Uvod") {
  pages = uvodPages;
} else if (CURRENT_PROJECT === "Obitelji") {
  pages = obiteljiPages;
} else {
  pages = getRodEntitetiIzvoriPages(CURRENT_PROJECT, data);
}

export default {
  title: `${CURRENT_PROJECT}`,
  pages,
  dynamicPaths: () => {
    return data
      .filter(o => o.ROD === CURRENT_PROJECT && o.OBITELJ)
      .map(o => `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`);
  },
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src",
};
