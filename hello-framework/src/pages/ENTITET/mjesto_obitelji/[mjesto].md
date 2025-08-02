<div id="observablehq-header-a155bfea"></div>
<div id="observablehq-obitelji_table-a155bfea"></div>
<div id="observablehq-obitelji_plot-a155bfea"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/42de06ed51b8ac0d.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-a155bfea"));
  if (name === "obitelji_table") return new Inspector(document.querySelector("#observablehq-obitelji_table-a155bfea"));
  if (name === "obitelji_plot") return new Inspector(document.querySelector("#observablehq-obitelji_plot-a155bfea"));
});
</script>
