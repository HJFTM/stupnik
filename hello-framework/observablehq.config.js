import { CURRENT_PROJECT, data } from "./observablehq.base.js";
import { uvodPages } from "./menu.uvod.js";

 import { getRodEntitetiIzvoriPages } from "./menu.rodovi.js"; // ⬅️ koristi dinamičku funkciju
 import { obiteljiPages, obiteljiPagesAll} from "./menu.obitelji.js";
 import { mjestaPages } from "./menu.mjesta.js";
 import { izvoriPages } from "./menu.izvori.js";

console.log("typeof data:", typeof data);
console.log("Array.isArray(data):", Array.isArray(data));

let pages;

pages = uvodPages;

if (CURRENT_PROJECT === "Uvod") {
  pages = uvodPages;
} else if (CURRENT_PROJECT === "Obitelji") {
  //pages = obiteljiPages;
} else if (CURRENT_PROJECT === "izvori") {
  //pages = izvoriPages;
} else {
  //pages = getRodEntitetiIzvoriPages(CURRENT_PROJECT, data.obitelji);
}

// 2️⃣ Entry points = sve stranice koje želimo da se statički izgrade
const entryPoints = [
  ...pages.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  //...mjestaPages.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
  //...obiteljiPagesAll.flatMap(p => (p.pages ? p.pages : [p])).map(p => p.path),
];

// 4️⃣ Finalni config
export default {
  title: `${CURRENT_PROJECT}`,
  pages,
  //entryPoints,
  //dynamicPaths,
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src"
};
