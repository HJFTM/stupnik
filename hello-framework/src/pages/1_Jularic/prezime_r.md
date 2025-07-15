<div id="observablehq-prezime_header-f5527d99"></div>
<div id="observablehq-prezime_opis-f5527d99"></div>
<div id="observablehq-prezime_plot-f5527d99"></div>
<div id="observablehq-prezime_table-f5527d99"></div>
<p>Credit: <a href="https://observablehq.com/d/3a9b8d56718102ec">Prezime (R) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/3a9b8d56718102ec.js?v=4";
new Runtime().module(define, name => {
  if (name === "prezime_header") return new Inspector(document.querySelector("#observablehq-prezime_header-f5527d99"));
  if (name === "prezime_opis") return new Inspector(document.querySelector("#observablehq-prezime_opis-f5527d99"));
  if (name === "prezime_plot") return new Inspector(document.querySelector("#observablehq-prezime_plot-f5527d99"));
  if (name === "prezime_table") return new Inspector(document.querySelector("#observablehq-prezime_table-f5527d99"));
});
</script>
