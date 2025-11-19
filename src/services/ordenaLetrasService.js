import { CONFIG_JUEGO_PRODHAB } from "../juegosEnvironments.js";

export async function obtenerTextoYPalabras(idOrdenar) {
  try {
    if (!idOrdenar) {
      const params = new URLSearchParams(window.location.search);
      idOrdenar = params.get('idOrdenar');
    }

    const res = await fetch(
      `${CONFIG_JUEGO_PRODHAB.apiUrl}/api/PalabraJuego/solo-palabras/${idOrdenar}`
    );

    if (!res.ok) throw new Error('Error al obtener palabras del juego');

    const data = await res.json();

    const texto = data.descripcion || '';
    const todasPalabras = data.palabras || [];

    // Filtrar solo palabras completas que aparecen en el texto
    const palabrasFiltradas = todasPalabras.filter(p => {
      if (!p) return false;

      const palabraNorm = p.toLowerCase();
      const textoNorm = texto.toLowerCase();

      const regex = new RegExp(`\\b${palabraNorm}\\b`, "i");

      return regex.test(textoNorm);
    });

    return {
      idJuego: data.idJuego,
      texto,
      palabras: palabrasFiltradas,
      tema: data.nombre || '',
      detalle: data.detalle
    };

  } catch (err) {
    console.error('Error fetching texto y palabras:', err);
    return { idJuego: idOrdenar, texto: '', palabras: [], tema: '' };
  }
}
