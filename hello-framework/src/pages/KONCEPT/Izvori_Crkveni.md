<div id="observablehq-crkveni_header-d24567cc"></div>
<div id="observablehq-crkveni_plot-d24567cc"></div>
<div id="observablehq-crkveni_tekst-d24567cc"></div>
<div id="observablehq-zapis_plot-d24567cc"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/aa2974e289c3d650.js?v=4";
new Runtime().module(define, name => {
  if (name === "crkveni_header") return new Inspector(document.querySelector("#observablehq-crkveni_header-d24567cc"));
  if (name === "crkveni_plot") return new Inspector(document.querySelector("#observablehq-crkveni_plot-d24567cc"));
  if (name === "crkveni_tekst") return new Inspector(document.querySelector("#observablehq-crkveni_tekst-d24567cc"));
  if (name === "zapis_plot") return new Inspector(document.querySelector("#observablehq-zapis_plot-d24567cc"));
});
</script>
