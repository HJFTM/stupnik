<div id="observablehq-obitelji_header-b151584a"></div>
<div id="observablehq-obitelji_plot-b151584a"></div>
<div id="observablehq-obitelji_rod-b151584a"></div>
<div id="observablehq-uvod_plot-b151584a"></div>
<div id="observablehq-obitelji_footer-b151584a"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/3aea42249930354f.js?v=4";
new Runtime().module(define, name => {
  if (name === "obitelji_header") return new Inspector(document.querySelector("#observablehq-obitelji_header-b151584a"));
  if (name === "obitelji_plot") return new Inspector(document.querySelector("#observablehq-obitelji_plot-b151584a"));
  if (name === "obitelji_rod") return new Inspector(document.querySelector("#observablehq-obitelji_rod-b151584a"));
  if (name === "uvod_plot") return new Inspector(document.querySelector("#observablehq-uvod_plot-b151584a"));
  if (name === "obitelji_footer") return new Inspector(document.querySelector("#observablehq-obitelji_footer-b151584a"));
});
</script>
