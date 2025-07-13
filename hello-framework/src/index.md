---
toc: false
---

<div class="top-links">
  <a href="https://hjftm.github.io/observablehq_iframe/" target="_blank">Uvod</a>
  <a href="https://hjftm.github.io/bosna/" target="_blank">Bosna</a>
  <a href="https://hjftm.github.io/dubrovnik/" target="_blank">Dubrovnik</a>
  <a href="https://hjftm.github.io/stupnik/" target="_blank">Stupnik</a>
</div>

---

<div class="hero">
  <h1>Jularić / Ilarić</h1>
  <h2>Dobrodošli na stranice prezimena Jularić.</h2>
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

.top-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  margin: 1rem auto;
  flex-wrap: wrap;
  margin-bottom: 0;
  padding-bottom: 0;
}

.top-links a {
  padding: 0.25rem 0.75rem;
  background-color: var(--theme-background-code);
  color: var(--theme-foreground);
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.top-links a:hover {
  background-color: var(--theme-background);
}

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
