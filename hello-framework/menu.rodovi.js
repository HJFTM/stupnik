
export function getRodEntitetiIzvoriPages(rod, obitelji) {
 // const obiteljiPoMjestuPages = generirajObiteljiPoMjestu(obitelji, rod);
  const mjestaPages = generirajMjestaOdObitelji(obitelji, rod);

  return [
    {
      name: `Obitelji`,
      pages: [
        { name: "  Prezime",      path: `/pages/1_Jularic/prezime_r?ROD=${encodeURIComponent(rod)}` },
        { name: "  Generacije",   path: `/pages/ROD/Generacije_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Obitelji",     path: `/pages/ROD/Obitelji_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Događaji",     path: `/pages/ROD/Dogadjaji_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Stablo",       path: `/pages/ROD/Stablo_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Bolesti",      path: `/pages/ROD/Bolesti_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Mjesta",       path: `/pages/ROD/Mjesta_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Migracije",    path: `/pages/ROD/Migracije_R?ROD=${encodeURIComponent(rod)}` },
        { name: "  Izvori*",      path: `/pages/ROD/Izvori_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Župe",         path: `/pages/ROD/Zupe_R?ROD=${encodeURIComponent(rod)}` },
      ]
    },
    {
      name: "Mjesta",
      pages: [...mjestaPages]
    },
    {
      name: "Izvori",
      pages: [
        { name: "  Popisi",        path: `/pages/ROD/Izvor_Popisi?ROD=${encodeURIComponent(rod)}` },
        { name: "  Matice",        path: `/pages/ROD/Matice_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Groblje",       path: `/pages/ROD/Groblje_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Katastar",      path: `/pages/ROD/Katastar_D?ROD=${encodeURIComponent(rod)}` },
        { name: "  Pismo / Jezik", path: `/pages/ROD/Pismo_D?ROD=${encodeURIComponent(rod)}` },
      ]
    },
    {
      name: "----------",
      pages: [
        { name: "Sadržaj",        path: "/pages/KONCEPT/Navigacija" },
        { name: "  Generacije2",  path: `/pages/ROD/generacije/${encodeURIComponent(rod)}`},
      ]
    }
  ];
}

function generirajMjestaOdObitelji(obitelji, rod = "Bosna") {
  const mjestaMap = new Map();
  const obitelj_m = obitelji.filter(o => o.TIP === "M" && o.ROD === rod && o.OBITELJ);

  const mjestaSet = new Set();
  for (const o of obitelj_m) {
    if (o.MJESTO) mjestaSet.add(o.MJESTO.trim());
  }

  for (const mjesto of mjestaSet) {
    let najstarijaGodina = null;

    for (const o of obitelj_m) {
      const godina = parseInt(o.GODINA);
      if (!isFinite(godina)) continue;

      const migracije = (o.MIGRACIJA || "").split(/[,;]/).map(s => s.trim());
      const mjestoMatch = (o.MJESTO && o.MJESTO.trim() === mjesto) || migracije.includes(mjesto);

      if (mjestoMatch && (najstarijaGodina == null || godina < najstarijaGodina)) {
        najstarijaGodina = godina;
      }
    }

    if (najstarijaGodina != null) {
      mjestaMap.set(mjesto, najstarijaGodina);
    }
  }

  return Array.from(mjestaMap.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([mjesto, godina]) => ({
      name: `${godina}. ${mjesto}`,
      path: `/pages/ENTITET/mjesto/${encodeURIComponent(mjesto)}`
    }));
}
