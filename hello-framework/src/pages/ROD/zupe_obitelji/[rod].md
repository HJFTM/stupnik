<div id="observablehq-header-a3606730"></div>
<div id="observablehq-plot-a3606730"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/c939f9f404ab95a5.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-a3606730"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-a3606730"));
});
</script>
