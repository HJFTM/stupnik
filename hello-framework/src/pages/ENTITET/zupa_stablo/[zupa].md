<div id="observablehq-header-64f27726"></div>
<div id="observablehq-plot_tree-64f27726"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/dbc76f56265bf8a5.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-64f27726"));
  if (name === "plot_tree") return new Inspector(document.querySelector("#observablehq-plot_tree-64f27726"));
});
</script>
