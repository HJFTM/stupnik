<div id="observablehq-uvod_header-c566fa76"></div>
<div id="observablehq-uvod_plot-c566fa76"></div>
<div id="observablehq-uvod_footer-c566fa76"></div>
<p>Credit: <a href="https://observablehq.com/d/814307512a1d2b68">Untitled by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/814307512a1d2b68.js?v=4";
new Runtime().module(define, name => {
  if (name === "uvod_header") return new Inspector(document.querySelector("#observablehq-uvod_header-c566fa76"));
  if (name === "uvod_plot") return new Inspector(document.querySelector("#observablehq-uvod_plot-c566fa76"));
  if (name === "uvod_footer") return new Inspector(document.querySelector("#observablehq-uvod_footer-c566fa76"));
});
</script>
