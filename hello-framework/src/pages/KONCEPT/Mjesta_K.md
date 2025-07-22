<div id="observablehq-mjesta_header-a2ae5c0d"></div>
<div id="observablehq-mjesta_geo-a2ae5c0d"></div>
<div id="observablehq-mjesta_header1-a2ae5c0d"></div>
<div id="observablehq-mjesta_broj-a2ae5c0d"></div>
<div id="observablehq-mjesta_footer-a2ae5c0d"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/b313e21d5ed7eb88.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesta_header") return new Inspector(document.querySelector("#observablehq-mjesta_header-a2ae5c0d"));
  if (name === "mjesta_geo") return new Inspector(document.querySelector("#observablehq-mjesta_geo-a2ae5c0d"));
  if (name === "mjesta_header1") return new Inspector(document.querySelector("#observablehq-mjesta_header1-a2ae5c0d"));
  if (name === "mjesta_broj") return new Inspector(document.querySelector("#observablehq-mjesta_broj-a2ae5c0d"));
  if (name === "mjesta_footer") return new Inspector(document.querySelector("#observablehq-mjesta_footer-a2ae5c0d"));
});
</script>
