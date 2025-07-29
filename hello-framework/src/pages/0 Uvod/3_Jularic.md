<div id="observablehq-header-661342ec"></div>
<div id="observablehq-prezime_zapis_plot-661342ec"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/082aeed46ab4f4ec.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-661342ec"));
  if (name === "prezime_zapis_plot") return new Inspector(document.querySelector("#observablehq-prezime_zapis_plot-661342ec"));
});
</script>
