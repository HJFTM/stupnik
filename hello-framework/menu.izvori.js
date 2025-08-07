export function generirajMaticePoZupi(dataCombined, rod = "Bosna") {
  const matice = dataCombined.matice.filter(m => m.UID && m.UID !== null);
  const zupeSet = new Set();

  for (const m of matice) {
    if (!m.ROD || m.ROD !== rod || !m.ZUPA || !m.MATICA) continue;
    zupeSet.add(m.ZUPA.trim());
  }

  const zupe = Array.from(zupeSet);
  const mapaZupa = {};

  for (const zupa of zupe) {
    mapaZupa[zupa] = matice
      .filter(z =>
        z.ROD === rod &&
        z.MATICA &&
        z.ZUPA &&
        z.ZUPA.trim() === zupa
      )
      .map(z => ({
        name: z.MATICA,
        path: `/pages/ENTITET/matica/${encodeURIComponent(z.MATICA)}`,
        pathEncoded2: `/pages/ENTITET/matica/${encodeURIComponent(encodeURIComponent(z.MATICA))}`,
        geo_path: `/pages/ENTITET/matica_geo/${encodeURIComponent(z.MATICA)}`,
        geo_pathEncoded2: `/pages/ENTITET/matica_geo/${encodeURIComponent(encodeURIComponent(z.MATICA))}`
      }));
  }

  return Object.entries(mapaZupa).map(([zupa, matice]) => ({
    name: zupa,
    pages: matice
  }));
}
