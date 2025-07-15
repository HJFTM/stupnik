<div id="observablehq-mjesta_header-ff1ddccc"></div>
<div id="observablehq-mjesta_table-ff1ddccc"></div>
<div id="observablehq-mjesta_geo-ff1ddccc"></div>
<div id="observablehq-mjesta_plot-ff1ddccc"></div>
<p>Credit: <a href="https://observablehq.com/d/702564761cbe308e">Mjesta (R) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/702564761cbe308e.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesta_header") return new Inspector(document.querySelector("#observablehq-mjesta_header-ff1ddccc"));
  if (name === "mjesta_table") return new Inspector(document.querySelector("#observablehq-mjesta_table-ff1ddccc"));
  if (name === "mjesta_geo") return new Inspector(document.querySelector("#observablehq-mjesta_geo-ff1ddccc"));
  if (name === "mjesta_plot") return new Inspector(document.querySelector("#observablehq-mjesta_plot-ff1ddccc"));
});
</script>
