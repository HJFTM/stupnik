<div id="observablehq-header-2a18f588"></div>
<div id="observablehq-table-2a18f588"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/0360b74e91a72d54.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-2a18f588"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-2a18f588"));
});
</script>
