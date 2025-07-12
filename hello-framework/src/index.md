---
toc: false
---

<div class="hero">
  <h1>Jularić / Ilarić</h1>
  <h2>Dobrodošli na stranice prezimena Jularić.</h2>
  <a href="https://observablehq.com/framework/getting-started">Get started<span style="display: inline-block; margin-left: 0.25rem;">↗︎</span></a>
</div>

<div class="hero">
<div id="observablehq-mapa-ecaa107d"></div>
<p>Credit: <a href="https://observablehq.com/d/b313e21d5ed7eb88@247">Sela (Mjesta) (K) by FTM</a></p>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/b313e21d5ed7eb88.js?v=4";
new Runtime().module(define, name => {
  if (name === "mapa") return new Inspector(document.querySelector("#observablehq-mapa-ecaa107d"));
});
</script>
</div>
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>

---

function ToggleSidebar() {
  const [open, setOpen] = useState(false);
  return html`
    <div>
      <button
        class="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
        onclick=${() => setOpen(!open)}
      >
        ${open ? "✖" : "☰"} Izbornik
      </button>

      <aside
        class=${`fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 transition-transform transform z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 class="text-lg font-semibold mb-4">Navigacija</h2>
        <ul class="space-y-2">
          <li><a href="/" class="text-blue-600">Početna</a></li>
          <li><a href="/drugo" class="text-blue-600">Druga stranica</a></li>
        </ul>
      </aside>
    </div>
  `;
}
