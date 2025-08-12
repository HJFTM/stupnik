<div id="observablehq-zupe_header-52af7921"></div>
<div id="observablehq-zupe_plot-52af7921"></div>
<div id="observablehq-zupe_geo-52af7921"></div>
<div id="observablehq-zupe_table-52af7921"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/fcc44adcdb25b804.js?v=4";
new Runtime().module(define, name => {
  if (name === "zupe_header") return new Inspector(document.querySelector("#observablehq-zupe_header-52af7921"));
  if (name === "zupe_plot") return new Inspector(document.querySelector("#observablehq-zupe_plot-52af7921"));
  if (name === "zupe_geo") return new Inspector(document.querySelector("#observablehq-zupe_geo-52af7921"));
  if (name === "zupe_table") return new Inspector(document.querySelector("#observablehq-zupe_table-52af7921"));
});
</script>
