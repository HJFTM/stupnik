<div id="observablehq-povezane_header-46f2962f"></div>
<div id="observablehq-povezane_plot-46f2962f"></div>
<div id="observablehq-povezane_zanimljivost-46f2962f"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/87534d5fe682f6a0.js?v=4";
new Runtime().module(define, name => {
  if (name === "povezane_header") return new Inspector(document.querySelector("#observablehq-povezane_header-46f2962f"));
  if (name === "povezane_plot") return new Inspector(document.querySelector("#observablehq-povezane_plot-46f2962f"));
  if (name === "povezane_zanimljivost") return new Inspector(document.querySelector("#observablehq-povezane_zanimljivost-46f2962f"));
});
</script>
