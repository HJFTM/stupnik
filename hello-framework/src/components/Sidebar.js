import { html } from "htm/preact";
import { useState } from "preact/hooks";

export default function Sidebar({ open }) {
  const [openGroup, setOpenGroup] = useState(false);

  return html`
    <aside class="w-64 bg-gray-100 p-4">
      <h2 class="font-bold mb-4">Moj Izbornik</h2>
      <button onClick=${() => setOpenGroup(!openGroup)}>
        ${openGroup ? "▲" : "▼"} Moje stranice
      </button>
      <ul class=${openGroup ? "" : "hidden"}>
        <li><a href="/src/index.md">Početna</a></li>
        <li><a href="/src/example-dashboard.md">Dashboard</a></li>
        <li><a href="/src/example-report.md">Report</a></li>
      </ul>
    </aside>
  `;
}
