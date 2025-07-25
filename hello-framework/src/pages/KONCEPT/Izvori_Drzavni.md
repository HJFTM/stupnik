<div id="observablehq-header-8e5838a3"></div>
<div id="observablehq-plot-8e5838a3"></div>
<div id="observablehq-tekst-8e5838a3"></div>
<div id="observablehq-zapisi_plot-8e5838a3"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/004c3a805b2789f3.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-8e5838a3"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-8e5838a3"));
  if (name === "tekst") return new Inspector(document.querySelector("#observablehq-tekst-8e5838a3"));
  if (name === "zapisi_plot") return new Inspector(document.querySelector("#observablehq-zapisi_plot-8e5838a3"));
});
</script>
