<div id="observablehq-header-554f49eb"></div>
<div id="observablehq-zapisi_table-554f49eb"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/1139dab5d2013347.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-554f49eb"));
  if (name === "zapisi_table") return new Inspector(document.querySelector("#observablehq-zapisi_table-554f49eb"));
});
</script>
