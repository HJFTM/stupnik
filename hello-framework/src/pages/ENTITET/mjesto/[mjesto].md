<div id="observablehq-mjesto_header-d9248225"></div>
<div id="observablehq-mjesto_geo-d9248225"></div>
<div id="observablehq-zapisi-d9248225"></div>
<div id="observablehq-zapis_plot-d9248225"></div>
<div id="observablehq-obitelji_table-d9248225"></div>
<div id="observablehq-obitelji_plot-d9248225"></div>
<div id="observablehq-migracije_table-d9248225"></div>
<div id="observablehq-zupe_table-d9248225"></div>
<div id="observablehq-zupe_plot-d9248225"></div>
<p>Credit: <a href="https://observablehq.com/d/7e80c377ee6aaeaf">Mjesto (E) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/7e80c377ee6aaeaf.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesto_header") return new Inspector(document.querySelector("#observablehq-mjesto_header-d9248225"));
  if (name === "mjesto_geo") return new Inspector(document.querySelector("#observablehq-mjesto_geo-d9248225"));
  if (name === "zapisi") return new Inspector(document.querySelector("#observablehq-zapisi-d9248225"));
  if (name === "zapis_plot") return new Inspector(document.querySelector("#observablehq-zapis_plot-d9248225"));
  if (name === "obitelji_table") return new Inspector(document.querySelector("#observablehq-obitelji_table-d9248225"));
  if (name === "obitelji_plot") return new Inspector(document.querySelector("#observablehq-obitelji_plot-d9248225"));
  if (name === "migracije_table") return new Inspector(document.querySelector("#observablehq-migracije_table-d9248225"));
  if (name === "zupe_table") return new Inspector(document.querySelector("#observablehq-zupe_table-d9248225"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-d9248225"));
});
</script>
