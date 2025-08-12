<div id="observablehq-header-60b49da5"></div>
<div id="observablehq-table-60b49da5"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/85bd9e1fe9ec4f86.js?v=4&api_key=d0ef10b6824f33e07504f5ca58de5cd2f265fcd9";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-60b49da5"));
  if (name === "table") return new Inspector(document.querySelector("#observablehq-table-60b49da5"));
});
</script>
