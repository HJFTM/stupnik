<div id="observablehq-stablo_header-e3f1ecb4"></div>
<div id="observablehq-stablo_plot-e3f1ecb4"></div>
<p>Credit: <a href="https://observablehq.com/d/8fc4a2673a126f10">Stablo (R) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/8fc4a2673a126f10.js?v=4&api_key=3a4f10ce4229cebd8452f4d13b214fbc900db125";
new Runtime().module(define, name => {
  if (name === "stablo_header") return new Inspector(document.querySelector("#observablehq-stablo_header-e3f1ecb4"));
  if (name === "stablo_plot") return new Inspector(document.querySelector("#observablehq-stablo_plot-e3f1ecb4"));
});
</script>
