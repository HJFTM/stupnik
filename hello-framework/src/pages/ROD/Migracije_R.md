<div id="observablehq-migracije_header-f431a396"></div>
<div id="observablehq-migracije_plot-f431a396"></div>
<div id="observablehq-migracije_table-f431a396"></div>
<div id="observablehq-migracije_text-f431a396"></div>
<p>Credit: <a href="https://observablehq.com/d/406804dcf91a0e67">Migracije (R) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/406804dcf91a0e67.js?v=4";
new Runtime().module(define, name => {
  if (name === "migracije_header") return new Inspector(document.querySelector("#observablehq-migracije_header-f431a396"));
  if (name === "migracije_plot") return new Inspector(document.querySelector("#observablehq-migracije_plot-f431a396"));
  if (name === "migracije_table") return new Inspector(document.querySelector("#observablehq-migracije_table-f431a396"));
  if (name === "migracije_text") return new Inspector(document.querySelector("#observablehq-migracije_text-f431a396"));
});
</script>
