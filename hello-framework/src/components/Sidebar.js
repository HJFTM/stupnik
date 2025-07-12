export default function Sidebar({ open }) {
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
      </ul>
    </aside>
  `;
}
