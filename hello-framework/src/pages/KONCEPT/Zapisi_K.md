<div id="observablehq-zapisi_header-6e356c92"></div>
<div id="observablehq-zapisi_plot-6e356c92"></div>
<div id="observablehq-dogadjaji_plot-6e356c92"></div>
<div id="observablehq-zapisi_text-6e356c92"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/33609213d6fadea3.js?v=4";
new Runtime().module(define, name => {
  if (name === "zapisi_header") return new Inspector(document.querySelector("#observablehq-zapisi_header-6e356c92"));
  if (name === "zapisi_plot") return new Inspector(document.querySelector("#observablehq-zapisi_plot-6e356c92"));
  if (name === "dogadjaji_plot") return new Inspector(document.querySelector("#observablehq-dogadjaji_plot-6e356c92"));
  if (name === "zapisi_text") return new Inspector(document.querySelector("#observablehq-zapisi_text-6e356c92"));
});
</script>
