<div id="observablehq-mjesta_header-d8acfd68"></div>
<div id="observablehq-mjesta_plot-d8acfd68"></div>
<div id="observablehq-mjesta_geo-d8acfd68"></div>
<div id="observablehq-mjesta_table-d8acfd68"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/702564761cbe308e.js?v=4";
new Runtime().module(define, name => {
  if (name === "mjesta_header") return new Inspector(document.querySelector("#observablehq-mjesta_header-d8acfd68"));
  if (name === "mjesta_plot") return new Inspector(document.querySelector("#observablehq-mjesta_plot-d8acfd68"));
  if (name === "mjesta_geo") return new Inspector(document.querySelector("#observablehq-mjesta_geo-d8acfd68"));
  if (name === "mjesta_table") return new Inspector(document.querySelector("#observablehq-mjesta_table-d8acfd68"));
});
</script>
