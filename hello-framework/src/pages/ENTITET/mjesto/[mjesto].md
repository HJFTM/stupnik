<div id="observablehq-mjesto_header-ebf5ab27"></div>
<div id="observablehq-mjesta_header-ebf5ab27"></div>
<div id="observablehq-mjesto_geo-ebf5ab27"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/7e80c377ee6aaeaf.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesto_header") return new Inspector(document.querySelector("#observablehq-mjesto_header-ebf5ab27"));
  if (name === "mjesta_header") return new Inspector(document.querySelector("#observablehq-mjesta_header-ebf5ab27"));
  if (name === "mjesto_geo") return new Inspector(document.querySelector("#observablehq-mjesto_geo-ebf5ab27"));
});
</script>
