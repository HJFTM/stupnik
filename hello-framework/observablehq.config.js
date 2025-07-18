
import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./observablehq.uvod.js";
import { rodEntitetiIzvoriPages } from "./observablehq.rodovi.js";
import { obiteljiPages } from "./observablehq.obitelji.js"; // ➕ Dodaj ovo

let pages;

if (CURRENT_PROJECT === "Uvod") {
  pages = uvodPages;
} else if (CURRENT_PROJECT === "Obitelji") {
  pages = obiteljiPages;
} else {
  pages = rodEntitetiIzvoriPages;
}

export default {
  // layout: "./src/layout.js",
  title: `${CURRENT_PROJECT}`,
  {
    name: "Navigacija",
    pages: [
      { name: "Navigacija", path: "/pages/KONCEPT/Navigacija" }
    ]
  },
  pages,
  dynamicPaths: () => {
    return data
      .filter(o => o.ROD === "Bosna" && o.OBITELJ)
      .map(o => `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`);
  },
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src",
};
