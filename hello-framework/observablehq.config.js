import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./observablehq.uvod.js";
import { rodEntitetiIzvoriPages } from "./observablehq.rodovi.js";

const pages = (CURRENT_PROJECT === "svi_rodovi") ? uvodPages : rodEntitetiIzvoriPages;

export default {
  title: `Jularić (${CURRENT_PROJECT})`,
  pages,
  dynamicPaths: () => {
    return data
      .filter(o => o.ROD === "Bosna" && o.OBITELJ)
      .map(o => `/pages/ENTITET/obitelj/${encodeURIComponent(o.OBITELJ)}`);
  },
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src",
};
