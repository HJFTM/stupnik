<div id="observablehq-header-d580a609"></div>
<div id="observablehq-tree_obitelj-d580a609"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/218f7aa15217f47e.js?v=4";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-d580a609"));
  if (name === "tree_obitelj") return new Inspector(document.querySelector("#observablehq-tree_obitelj-d580a609"));
});
</script>
