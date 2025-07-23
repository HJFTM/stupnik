<div id="observablehq-header-a090ee03"></div>
<div id="observablehq-plot-a090ee03"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/0bbea70f92998dc6.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-a090ee03"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-a090ee03"));
});
</script>
