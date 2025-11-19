import { CONFIG_JUEGO_PRODHAB } from "../juegosEnvironments.js";

export async function obtenerDatosSopa(idSopa) {
    try {
        // Si no se pasó el ID, obtenerlo desde la URL (?idSopa=)
        if (!idSopa) {
            const params = new URLSearchParams(window.location.search);
            idSopa = parseInt(params.get("idSopa"));
        }

        const res = await fetch(
            `${CONFIG_JUEGO_PRODHAB.apiUrl}/api/PalabraJuego/solo-palabras/${idSopa}`
        );

        if (!res.ok) throw new Error("Error al obtener datos de la API");

        const data = await res.json();

        return {
            idJuego: data.idJuego,
            descripcion: data.descripcion,
            detalle: data.detalle || "",
            nombre: data.nombre || "Sopa de letras",
            palabras: Array.isArray(data.palabras)
                ? data.palabras.map((p) => p.toUpperCase())
                : []
        };
    } catch (err) {
        console.error("SopaLetrasService:", err);

        return {
            idJuego: null,
            tema: "Países",
            detalle: "Encuentra los nombres de países en la sopa de letras.",
            palabras: ["JAPÓN", "BRASIL", "FRANCIA", "CANADÁ"]
        };
    }
}
