<div id="observablehq-zupe_header-66f609ce"></div>
<div id="observablehq-zupe_plot-66f609ce"></div>
<div id="observablehq-zupe_izazovi-66f609ce"></div>
<div id="observablehq-zupe_GEO-66f609ce"></div>
<p>Credit: <a href="https://observablehq.com/d/426321f4775c6ab3">Župe (K) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/426321f4775c6ab3.js?v=4";
new Runtime().module(define, name => {
  if (name === "zupe_header") return new Inspector(document.querySelector("#observablehq-zupe_header-66f609ce"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-66f609ce"));
  if (name === "zupe_izazovi") return new Inspector(document.querySelector("#observablehq-zupe_izazovi-66f609ce"));
  if (name === "zupe_GEO") return new Inspector(document.querySelector("#observablehq-zupe_GEO-66f609ce"));
});
</script>
