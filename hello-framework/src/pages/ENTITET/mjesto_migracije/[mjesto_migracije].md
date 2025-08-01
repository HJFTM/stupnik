<div id="observablehq-header-9e4beb4e"></div>
<div id="observablehq-migracije_table-9e4beb4e"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/df8fc0e5efe82f9b.js?v=4&api_key=376db935d454e37ca76569fd9a8082363dddb656";
new Runtime().module(define, name => {
  if (name === "header") return new Inspector(document.querySelector("#observablehq-header-9e4beb4e"));
  if (name === "migracije_table") return new Inspector(document.querySelector("#observablehq-migracije_table-9e4beb4e"));
});
</script>
