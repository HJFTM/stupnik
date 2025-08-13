<div id="observablehq-header-87869b9e"></div>
<div id="observablehq-zapisi_table-87869b9e"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/ac5ec6d197a970fc.js?v=4&api_key=295f30689fc35e5a6ea48e84d850ae3f36776edf";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-87869b9e"));
  if (name === "zapisi_table") return new Inspector(document.querySelector("#observablehq-zapisi_table-87869b9e"));
});
</script>
