<div id="observablehq-mjesto_header-8e67f67f"></div>
<div id="observablehq-mjesto_geo-8e67f67f"></div>
<div id="observablehq-obitelji_plot-8e67f67f"></div>
<div id="observablehq-viewof-table-8e67f67f"></div>
<div id="observablehq-zupe_plot-8e67f67f"></div>
<p>Credit: <a href="https://observablehq.com/d/7e80c377ee6aaeaf">Mjesto (E) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/7e80c377ee6aaeaf.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesto_header") return new Inspector(document.querySelector("#observablehq-mjesto_header-8e67f67f"));
  if (name === "mjesto_geo") return new Inspector(document.querySelector("#observablehq-mjesto_geo-8e67f67f"));
  if (name === "obitelji_plot") return new Inspector(document.querySelector("#observablehq-obitelji_plot-8e67f67f"));
  if (name === "viewof table") return new Inspector(document.querySelector("#observablehq-viewof-table-8e67f67f"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-8e67f67f"));
});
</script>
