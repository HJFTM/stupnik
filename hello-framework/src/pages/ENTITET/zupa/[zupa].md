<div id="observablehq-table_zupe-0d723eeb"></div>
<div id="observablehq-plot_tree-0d723eeb"></div>
<div id="observablehq-plot_GEO-0d723eeb"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/e30398d0197e9967.js?v=4";
new Runtime().module(define, name => {
  if (name === "table_zupe") return new Inspector(document.querySelector("#observablehq-table_zupe-0d723eeb"));
  if (name === "plot_tree") return new Inspector(document.querySelector("#observablehq-plot_tree-0d723eeb"));
  if (name === "plot_GEO") return new Inspector(document.querySelector("#observablehq-plot_GEO-0d723eeb"));
});
</script>
