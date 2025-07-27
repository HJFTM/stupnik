<div id="observablehq-table-2218066f"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/56b5bd7ae4b4670c.js?v=4";
new Runtime().module(define, name => {
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-2218066f"));
});
</script>
