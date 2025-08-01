<div id="observablehq-header-89fbfd8c"></div>
<div id="observablehq-zupe_table-89fbfd8c"></div>
<div id="observablehq-zupe_plot-89fbfd8c"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/95ba13b17eb11297.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-89fbfd8c"));
  if (name === "zupe_table") return new Inspector(document.querySelector("#observablehq-zupe_table-89fbfd8c"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-89fbfd8c"));
});
</script>
