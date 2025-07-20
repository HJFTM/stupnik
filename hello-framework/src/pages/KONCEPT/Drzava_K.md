<div id="observablehq-drzava_header-be889293"></div>
<div id="observablehq-drzava_text-be889293"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/8dc7b2ea81c182ac.js?v=4";
new Runtime().module(define, name => {
  if (name === "drzava_header") return new Inspector(document.querySelector("#observablehq-drzava_header-be889293"));
  if (name === "drzava_text") return new Inspector(document.querySelector("#observablehq-drzava_text-be889293"));
});
</script>
