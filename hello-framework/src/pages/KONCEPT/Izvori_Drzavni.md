<div id="observablehq-header-3c399584"></div>
<div id="observablehq-plot-3c399584"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/004c3a805b2789f3.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-3c399584"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-3c399584"));
});
</script>
