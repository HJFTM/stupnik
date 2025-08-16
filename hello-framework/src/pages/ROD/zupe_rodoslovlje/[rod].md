<div id="observablehq-header-f4fe8e64"></div>
<div id="observablehq-plot-f4fe8e64"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/58d138b25a877fc0.js?v=4&api_key=d1e3fbcc284147572f6ae58525c6e683582635b4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-f4fe8e64"));
  if (name === "plot") return new Inspector(document.querySelector("#observablehq-plot-f4fe8e64"));
});
</script>
