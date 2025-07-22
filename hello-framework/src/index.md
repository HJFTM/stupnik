<div id="observablehq-index_header-174c12c0"></div>
<div id="observablehq-mjesta_geo-174c12c0"></div>
<div id="observablehq-index_footer-174c12c0"></div>
<p>Credit: <a href="https://observablehq.com/d/d1e5e12448b03e80">Index.md by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/d1e5e12448b03e80.js?v=4";
new Runtime().module(define, name => {
  if (name === "index_header") return new Inspector(document.querySelector("#observablehq-index_header-174c12c0"));
  if (name === "mjesta_geo") return new Inspector(document.querySelector("#observablehq-mjesta_geo-174c12c0"));
  if (name === "index_footer") return new Inspector(document.querySelector("#observablehq-index_footer-174c12c0"));
});
</script>
