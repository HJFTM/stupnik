<div id="observablehq-groblja_header-2845e857"></div>
<div id="observablehq-groblja_plot-2845e857"></div>
<div id="observablehq-table-2845e857"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/868172349b01ecd3.js?v=4";
new Runtime().module(define, name => {
  if (name === "groblja_header") return new Inspector(document.querySelector("#observablehq-groblja_header-2845e857"));
  if (name === "groblja_plot") return new Inspector(document.querySelector("#observablehq-groblja_plot-2845e857"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-2845e857"));
});
</script>
