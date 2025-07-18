<div id="observablehq-mjesta_header-d06179e2"></div>
<div id="observablehq-mjesta_geo-d06179e2"></div>
<div id="observablehq-mjesta_footer-d06179e2"></div>
<p>Credit: <a href="https://observablehq.com/d/b313e21d5ed7eb88">Mjesta (K) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/b313e21d5ed7eb88.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesta_header") return new Inspector(document.querySelector("#observablehq-mjesta_header-d06179e2"));
  if (name === "mjesta_geo") return new Inspector(document.querySelector("#observablehq-mjesta_geo-d06179e2"));
  if (name === "mjesta_footer") return new Inspector(document.querySelector("#observablehq-mjesta_footer-d06179e2"));
});
</script>
