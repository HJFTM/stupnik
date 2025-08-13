<div id="observablehq-header-4f42107b"></div>
<div id="observablehq-tree_plot-4f42107b"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/2bcdaf76ff1fd0d1.js?v=4&api_key=bd8e7e12aaff4b99acde5e72fc5ae24653edce72";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-4f42107b"));
  if (name === "tree_plot") return new Inspector(document.querySelector("#observablehq-tree_plot-4f42107b"));
});
</script>
