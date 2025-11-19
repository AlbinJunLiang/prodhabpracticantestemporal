import { CONFIG_JUEGO_PRODHAB } from "../juegosEnvironments.js";
import {  escapeAttr, escapeHtml} from "../util/juegoFunctionUtility.js";


export async function obtenerPreguntasTest(idTest) {
  try {
    if (!idTest) {
      const params = new URLSearchParams(window.location.search);
      idTest = params.get("idTest");
    }

    const res = await fetch(
      `${CONFIG_JUEGO_PRODHAB.apiUrl}/api/Test/preguntas/${Number(idTest)}`
    );

    if (!res.ok) throw new Error("Error al obtener preguntas");
    return await res.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export async function enviarRespuestasTest(respuestas, idTest) {
  try {
    if (!idTest) {
      const params = new URLSearchParams(window.location.search);
      idTest = params.get("idTest");
    }

    const response = await fetch(
      `${CONFIG_JUEGO_PRODHAB.apiUrl}/api/Test/evaluar/${idTest}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuestas)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData.errors || errorData));
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

export function convertirLinkConEstiloTest(texto) {
  if (!texto) return "";

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return texto
    .replace(urlRegex, (url) => {
      const safeUrl = escapeAttr(url);
      return `%%LINK%%${safeUrl}%%LINK%%`;
    })
    .split(/%%LINK%%/)
    .map((segment, i) => {
      if (i % 2 === 1) {
        return `<a href="${segment}" target="_blank" style="color: blue; font-weight: bold;">haz clic aquí</a>`;
      }
      return escapeHtml(segment);
    })
    .join("");
}

export function mapearPreguntaAPITest(preguntaAPI) {
  const opciones = preguntaAPI.respuestas
    .map((r) => ({
      id: "o" + r.idRespuesta,
      texto: r.texto,
      correcta: r.esCorrecta
    }))
    .filter((r) => r.texto && r.texto.trim() !== "");

  if (opciones.length === 0) return null;

  return {
    id: "pregunta" + preguntaAPI.idPregunta,
    titulo: preguntaAPI.enunciado,
    categoria: preguntaAPI.tipo.toLowerCase(),
    opciones
  };
}

export function interpolarMensajeTest(mensaje, variables) {
  if (!mensaje) return "";

  const contieneVariables = /\$\{.+?\}/.test(mensaje);
  if (!contieneVariables) return mensaje;

  return mensaje.replace(/\$\{(.+?)\}/g, (_, key) => {
    return variables[key] !== undefined ? variables[key] : "";
  });
}
