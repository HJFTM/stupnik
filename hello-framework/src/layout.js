import { html } from "htm/preact";
import Sidebar from "./components/Sidebar.js";

export default function Layout({ children }) {
  return html`
    <div class="flex">
      ${Sidebar({ open: true })}
      <main class="flex-1 p-4">
        ${children}
      </main>
    </div>
  `;
}
