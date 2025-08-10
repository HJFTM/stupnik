<div id="observablehq-header-40daf427"></div>
<div id="observablehq-matice_plot-40daf427"></div>
<div id="observablehq-table-40daf427"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/eb1873cd2b6f4017.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-40daf427"));
  if (name === "matice_plot") return new Inspector(document.querySelector("#observablehq-matice_plot-40daf427"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-40daf427"));
});
</script>
