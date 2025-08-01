<div id="observablehq-header-d4780a60"></div>
<div id="observablehq-zapisi-d4780a60"></div>
<div id="observablehq-zapis_plot-d4780a60"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/04833182aa90e10f.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-d4780a60"));
  if (name === "zapisi") return new Inspector(document.querySelector("#observablehq-zapisi-d4780a60"));
  if (name === "zapis_plot") return new Inspector(document.querySelector("#observablehq-zapis_plot-d4780a60"));
});
</script>
