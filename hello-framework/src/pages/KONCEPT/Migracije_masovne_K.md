<div id="observablehq-migracije_header-7bed045e"></div>
<div id="observablehq-migracije_rane-7bed045e"></div>
<div id="observablehq-migracije_plot-7bed045e"></div>
<div id="observablehq-migracije_kasnije-7bed045e"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/fb10937a4aad2965.js?v=4";
new Runtime().module(define, name => {
  if (name === "migracije_header") return new Inspector(document.querySelector("#observablehq-migracije_header-7bed045e"));
  if (name === "migracije_rane") return new Inspector(document.querySelector("#observablehq-migracije_rane-7bed045e"));
  if (name === "migracije_plot") return new Inspector(document.querySelector("#observablehq-migracije_plot-7bed045e"));
  if (name === "migracije_kasnije") return new Inspector(document.querySelector("#observablehq-migracije_kasnije-7bed045e"));
});
</script>
