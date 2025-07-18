<div id="observablehq-generacije_header-e61c5a9e"></div>
<div id="observablehq-generacije_plot-e61c5a9e"></div>
<div id="observablehq-generacije_text_1-e61c5a9e"></div>
<div id="observablehq-generacije_text_2-e61c5a9e"></div>
<p>Credit: <a href="https://observablehq.com/d/e80ae2ee1de5552c">Generacije (K) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/e80ae2ee1de5552c.js?v=4";
new Runtime().module(define, name => {
  if (name === "generacije_header") return new Inspector(document.querySelector("#observablehq-generacije_header-e61c5a9e"));
  if (name === "generacije_plot") return new Inspector(document.querySelector("#observablehq-generacije_plot-e61c5a9e"));
  if (name === "generacije_text_1") return new Inspector(document.querySelector("#observablehq-generacije_text_1-e61c5a9e"));
  if (name === "generacije_text_2") return new Inspector(document.querySelector("#observablehq-generacije_text_2-e61c5a9e"));
});
</script>
