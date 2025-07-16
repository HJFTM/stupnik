import { useState } from "preact/hooks"; // Ako koristiš Preact u Observable Frameworku

export default function Sidebar({ open }) {
  const [openGroup, setOpenGroup] = useState(false);

  return html`
    <aside
      class=${`fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 transition-transform transform ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 class="text-xl font-bold mb-4">Izbornik</h2>
      <ul class="space-y-2">
        <li><a href="/" class="text-blue-600">Početna</a></li>
        <li><a href="/drugo" class="text-blue-600">Druga Stranica</a></li>

        <li>
          <button
            class="w-full text-left text-blue-600 font-semibold"
            onclick=${() => setOpenGroup(!openGroup)}
          >
            Obitelji 1700-1800 ${openGroup ? "▲" : "▼"}
          </button>
          <ul class=${`pl-4 space-y-1 transition-all ${openGroup ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
            <li><a href="/pages/ENTITET/obitelj/1700.%20Marko" class="text-blue-500">1700. Marko</a></li>
            <li><a href="/pages/ENTITET/obitelj/1720.%20Ivan" class="text-blue-500">1720. Ivan</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  `;
}
