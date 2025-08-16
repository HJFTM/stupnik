<div id="observablehq-header-65a8e806"></div>
<div id="observablehq-plot-65a8e806"></div>
<div id="observablehq-table_zadnja4-65a8e806"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/d5f889add64906d9.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-65a8e806"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-65a8e806"));
  if (name === "table_zadnja4") return new Inspector(document.querySelector("#observablehq-table_zadnja4-65a8e806"));
});
</script>
