<div id="observablehq-mjesto_header-62563750"></div>
<div id="observablehq-mjesto_geo-62563750"></div>
<div id="observablehq-zapisi-62563750"></div>
<div id="observablehq-zapis_plot-62563750"></div>
<div id="observablehq-obitelji_table-62563750"></div>
<div id="observablehq-obitelji_plot-62563750"></div>
<div id="observablehq-migracije_table-62563750"></div>
<div id="observablehq-zupe_plot-62563750"></div>
<p>Credit: <a href="https://observablehq.com/d/7e80c377ee6aaeaf">Mjesto (E) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/7e80c377ee6aaeaf.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesto_header") return new Inspector(document.querySelector("#observablehq-mjesto_header-62563750"));
  if (name === "mjesto_geo") return new Inspector(document.querySelector("#observablehq-mjesto_geo-62563750"));
  if (name === "zapisi") return new Inspector(document.querySelector("#observablehq-zapisi-62563750"));
  if (name === "zapis_plot") return new Inspector(document.querySelector("#observablehq-zapis_plot-62563750"));
  if (name === "obitelji_table") return new Inspector(document.querySelector("#observablehq-obitelji_table-62563750"));
  if (name === "obitelji_plot") return new Inspector(document.querySelector("#observablehq-obitelji_plot-62563750"));
  if (name === "migracije_table") return new Inspector(document.querySelector("#observablehq-migracije_table-62563750"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-62563750"));
});
</script>
