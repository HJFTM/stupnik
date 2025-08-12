<div id="observablehq-groblja_header-d3af9e99"></div>
<div id="observablehq-table-d3af9e99"></div>
<div id="observablehq-md_zapisi-d3af9e99"></div>
<div id="observablehq-groblja_plot-d3af9e99"></div>
<div id="observablehq-table_zadnja4-d3af9e99"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/868172349b01ecd3.js?v=4";
new Runtime().module(define, name => {
  if (name === "groblja_header") return new Inspector(document.querySelector("#observablehq-groblja_header-d3af9e99"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-d3af9e99"));
  if (name === "md_zapisi") return new Inspector(document.querySelector("#observablehq-md_zapisi-d3af9e99"));
  if (name === "groblja_plot") return new Inspector(document.querySelector("#observablehq-groblja_plot-d3af9e99"));
  if (name === "table_zadnja4") return new Inspector(document.querySelector("#observablehq-table_zadnja4-d3af9e99"));
});
</script>
