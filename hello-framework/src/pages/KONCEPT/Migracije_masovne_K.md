<div id="observablehq-migracije_header-1cab23de"></div>
<div id="observablehq-migracije_plot-1cab23de"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/fb10937a4aad2965.js?v=4";
new Runtime().module(define, name => {
  if (name === "migracije_header") return new Inspector(document.querySelector("#observablehq-migracije_header-1cab23de"));
  if (name === "migracije_plot") return new Inspector(document.querySelector("#observablehq-migracije_plot-1cab23de"));
});
</script>
