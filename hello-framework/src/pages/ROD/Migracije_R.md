<div id="observablehq-migracije_header-3a9086b8"></div>
<div id="observablehq-migracije_plot-3a9086b8"></div>
<div id="observablehq-migracije_table-3a9086b8"></div>
<div id="observablehq-plot_migracije-3a9086b8"></div>
<div id="observablehq-migracije_text-3a9086b8"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/406804dcf91a0e67.js?v=4";
new Runtime().module(define, name => {
  if (name === "migracije_header") return new Inspector(document.querySelector("#observablehq-migracije_header-3a9086b8"));
  if (name === "migracije_plot") return new Inspector(document.querySelector("#observablehq-migracije_plot-3a9086b8"));
  if (name === "migracije_table") return new Inspector(document.querySelector("#observablehq-migracije_table-3a9086b8"));
  if (name === "plot_migracije") return new Inspector(document.querySelector("#observablehq-plot_migracije-3a9086b8"));
  if (name === "migracije_text") return new Inspector(document.querySelector("#observablehq-migracije_text-3a9086b8"));
});
</script>
