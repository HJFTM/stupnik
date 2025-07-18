<div id="observablehq-bolesti_header-eecc8182"></div>
<div id="observablehq-bolest_plot-eecc8182"></div>
<div id="observablehq-bolesti_footer-eecc8182"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/f777e930c0aec7f8.js?v=4";
new Runtime().module(define, name => {
  if (name === "bolesti_header") return new Inspector(document.querySelector("#observablehq-bolesti_header-eecc8182"));
  if (name === "bolest_plot") return new Inspector(document.querySelector("#observablehq-bolest_plot-eecc8182"));
  if (name === "bolesti_footer") return new Inspector(document.querySelector("#observablehq-bolesti_footer-eecc8182"));
});
</script>
