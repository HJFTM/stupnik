<div id="observablehq-matice_header-a2e19e7a"></div>
<div id="observablehq-matice_plot-a2e19e7a"></div>
<div id="observablehq-table-a2e19e7a"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/aca98d0dfd21db23.js?v=4";
new Runtime().module(define, name => {
  if (name === "matice_header") return new Inspector(document.querySelector("#observablehq-matice_header-a2e19e7a"));
  if (name === "matice_plot") return new Inspector(document.querySelector("#observablehq-matice_plot-a2e19e7a"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-a2e19e7a"));
});
</script>
