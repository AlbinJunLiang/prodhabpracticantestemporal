class TestComponent extends HTMLElement {

    static componente = {
        styleURL: "test.css",
        serverURL: CONFIG.apiUrl,
        public: CONFIG.publicPath
    };

    static get observedAttributes() {
        return ["style-url", "correcta_svg", "incorrecta_svg", "character_png"];
    }


    constructor() {
        super();
        this.styleURL = this.getAttribute("style-url") || TestComponent.componente.styleURL;
        this.serverURL = this.getAttribute("server-url") || TestComponent.componente.serverURL;
        this.publicURL = this.getAttribute("public") || TestComponent.componente.public;
        this.correctaSVG = this.getAttribute("correcta_svg") || `${TestComponent.componente.public}/correcta.svg`;
        this.incorrectaSVG = this.getAttribute("incorrecta_svg") || `${TestComponent.componente.public}/incorrecta.svg`;
        this.characterPNG = this.getAttribute("character_png") || `${TestComponent.componente.public}/character.png`;



        this.attachShadow({ mode: 'open' }); // Shadow DOM para encapsular estilos
        this.shadowRoot.innerHTML = ` `;
        this.listaPreguntas = [];
        this.test = null;
        this.posicionPregunta = 0;
        this.shuffledOptionsMap = new Map();
        this.img = new Image();
        this.img.src = this.characterPNG;
        this.img.alt = "Superdato";
        this.img.className = "pet-icon";


    }

    connectedCallback() {
        this.renderizar();
        this.eventoInciar();
        this.eventoReiniciar();
        this.img.onload = () => {
            this.shadowRoot.getElementById('pet-test-text').appendChild(this.img);
        };
    }


    renderizar() {
        this.shadowRoot.innerHTML =
            ` 

            <style>
            * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  scroll-behavior: smooth;
}

.container {
  max-width: auto;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #2563eb;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.wrap {
  display: grid;
  place-items: center;
  width: 100%;
}

.card {
  width: 100%;
  max-width: 1000px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(2, 6, 23, 0.08);
  overflow: hidden;
}

.header,
.q-meta,
.footer-global,
.q-footer,
.left,
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header {
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.brand .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
}

.meta {
  font-size: 14px;
  color: #64748b;
}

.content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#div-stack {
  position: relative;
  width: 100%;
  min-height: 300px;
  margin-bottom: 20px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: girar 1s linear infinite;
  margin: 0 auto;
  margin-top: 12vh;
}

#titulo-test {
  font-size: 20px;
}

@keyframes girar {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.cargando {
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
.q-block {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  opacity: 0;
  transition: all 0.5s ease;
  height: auto;
}

.q-block.active {
  left: 0;
  opacity: 1;
  position: relative;
}

.q-block.exit-left,
.q-block.exit-right {
  left: var(--exit-position, -100%);
  opacity: 0;
  position: absolute;
  visibility: hidden;
}

.q-block.exit-right {
  --exit-position: 100%;
}

.q-meta {
  justify-content: space-between;
  font-size: 14px;
  color: #64748b;
}

.q-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  white-space: normal;
  overflow-wrap: normal;
  word-break: normal;
}

.options {
  display: grid;
  gap: 12px;
  height: auto;
  overflow: visible;
}

.option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  background: #fff;
  transition: 0.18s ease;
  flex: 1 1 auto;
  min-width: 0;
  white-space: normal;
  overflow-wrap: normal;
  word-break: normal;
}
.icono-respuesta {
  margin-left: 2px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  flex-shrink: 0;
}

.option:hover {
  box-shadow: 0 6px 14px rgba(2, 6, 23, 0.06);
  transform: translateY(-1px);
}

.option.selected {
  border-color: #2563eb;
  outline: 2px solid rgba(37, 99, 235, 0.15);
}

.option-text {
  flex: 1 1 auto;
  white-space: normal;
  overflow-wrap: break-word;
  font-size: 15px;
}

.bullet {
  width: 20px;
  height: 20px;
  border: 2px solid #64748b;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.option.selected .bullet {
  border-color: #2563eb;
}

.dot-small {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
}

.option.selected .dot-small {
  background: #2563eb;
}

.option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.q-footer {
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #e5e7eb;
}

button {
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #0f172a;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.18s ease;
  white-space: nowrap;
}

button.primary {
  background: #2563eb;
  color: #fff;
  border-color: transparent;
}

button.primary:hover {
  background: #1d4ed8;
}

button.ghost:hover {
  background: #f8fafc;
  color: black;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pill {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  color: #64748b;
  white-space: nowrap;
}

.result {
  display: none;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
}

.result.ok {
  background: #ecfdf5;
  color: #16a34a;
  border: 1px solid #86efac;
}

.result.bad {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.muted {
  color: #64748b;
}

.footer-global {
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
}

.summary {
  font-weight: 600;
  color: rgb(25, 41, 82);
  margin-left: 5px;
}

.instructions {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid  rgb(0, 53, 160);;
}

.instructions h3 {
  color: rgb(0, 53, 160);
  margin-bottom: 10px;
}

.finish {
  background:  rgb(0, 53, 160);;
  color: #fff;
}

.retroalimentacion {
  margin-top: 10px;
  color: rgb(0, 84, 134);
  font-weight: bold;
}

.progress {
  height: 10px;
  background: #eef2ff;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  width: 100%;
  margin-bottom: 1px;
}

.bar {
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, #082666, #60a5fa);
  transition: width 0.3s ease;
}

#btn-reiniciar {
  background-color: rgb(0, 31, 111);
}

#btn-reiniciar:hover {
  transform: scale(1.05);
}

.content-pet {
  font-size: 12px;
  line-height: 1.4;
  font-size: 14px;
  text-align: center;
}

.content-pet img.pet-icon {
  width: 92px;
  height: 92px;
  object-fit: contain;
  vertical-align: middle;
  max-height: 92px;
  width: 100%;
}

#pet-test-text {
  max-width: 200px;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
}

@media (max-width: 768px) {
  .header,
  .q-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-global {
    flex-direction: row;
    flex-wrap: nowrap; /* no permitir que baje a otra línea */
    align-items: center; /* centrar vertical */
    justify-content: space-between; /* extremos; usa flex-start si quieres juntos */
  }

  .q-title {
    font-size: 18px;
  }

  .option {
    padding: 12px;
  }

  .q-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .left,
  .right {
    justify-content: space-between;
  }

  #div-stack {
    min-height: 400px;
  }

  .prev,
  .next,
  .finish {
    position: fixed;
    bottom: 10px;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .prev,
  .next {
    border: 1px solid #ccc;
  }

  .prev {
    left: 10%;
  }

  .next,
  .finish {
    right: 10%;
  }

  .finish {
    background: rgb(0, 53, 160);;
    color: #fff;
    border-color: transparent;
  }
}

            </style>
          <div class="container">

      <div class="quiz-container">
        <div class="wrap">
          <main
            class="card"
            role="region"
            aria-label="Evaluación de conocimientos"
          >
            <div class="content">
              <h2 id="titulo-test"></h2>
              <div aria-hidden="true" class="progress">
                <div class="bar" style="width: 0%"></div>
              </div>
                <div class="summary"></div>
              <div
                id="div-stack"
                class="stack"
                aria-label="Listado de preguntas"
              >
                <div class="spinner"></div>
                <span class="cargando">Cargando... </span>
              </div>

              <div class="footer-global">
                <div class="right">
                  <button id="btn-reiniciar" class="primary m">
                    Reiniciar test
                  </button>
                </div>
                <div class="left">
                  <div class="content-pet">
                    <p id="pet-test-text"></p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
        `;
    }


    eventoInciar() {
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.style.transform = 'scale(0.98)';
                setTimeout(() => button.style.transform = '', 150);
            });
        });

        this.iniciarTest();
    }

    eventoReiniciar() {
        this.shadowRoot.getElementById('btn-reiniciar').addEventListener('click', () => {
            utilModalJuegos2.mostrarMensajeModal(
                "Reiniciar examen",
                "¿Estás seguro que deseas reiniciar el test?",
                () => {
                    this.reiniciarExamen();
                }
            );
        });
    }



    /**
     * Genera los botones de navegación para una pregunta del test.
     *
     * @param {number} index - El índice de la pregunta actual en la lista.
     * @param {number} total - El total de preguntas en el test.
     * @returns {string} HTML con los botones "Anterior", "Siguiente" y/o "Finalizar"
     *                   según la posición de la pregunta actual.
     *
     * @example
     * // Para la primera pregunta en un test de 5 preguntas:
     * crearBotones(0, 5);
     * // Devuelve solo el botón "Siguiente"
     *
     * @example
     * // Para la última pregunta:
     * crearBotones(4, 5);
     * // Devuelve solo el botón "Finalizar"
     */

    crearBotones = (index, total) => {
        let html = "";
        if (index > 0) html += `<button class="ghost prev" data-target="${index - 1}" type="button">Anterior</button>`;
        if (index < total - 1) html += `<button class="ghost next" data-target="${index + 1}" type="button">Siguiente</button>`;
        if (index === total - 1) html += `<button class="ghost finish" type="button">Finalizar</button>`;
        return html;
    };



    /**
 * Genera el HTML de las opciones para una pregunta del test.
 *
 * @param {Object} pregunta - Objeto que representa la pregunta, incluyendo su id y array de opciones.
 *                            Se espera que cada opción tenga un id y un texto.
 * @returns {string} Un string con el HTML de todas las opciones mezcladas, listo para insertarse en el DOM.
 *
 * @description
 * La función primero obtiene un ID numérico de la pregunta eliminando el prefijo "pregunta".
 * Luego mezcla aleatoriamente las opciones usando la función `mezclarOpciones`.
 * Guarda las opciones mezcladas en `shuffledOptionsMap` para poder acceder a ellas más tarde.
 * Finalmente, genera un bloque `<div>` por cada opción, con un id único basado en la opción y pregunta,
 * incluyendo la estructura de "bullet" y el texto de la opción, y devuelve todo concatenado como string.
 *
 * @example
 * // Suponiendo una pregunta con id "pregunta3" y dos opciones:
 * obtenerOpcionesHTML({ id: "pregunta3", opciones: [{id:"o1", texto:"Sí"}, {id:"o2", texto:"No"}] });
 * // Devuelve HTML para los dos divs de opciones con IDs únicos.
 */


    obtenerOpcionesHTML = (pregunta) => {
        const preguntaId = Number(String(pregunta.id).replace(/^pregunta/, '')); // Numeric ID
        const opciones = mezclarOpcionesTest(pregunta);
        // Store shuffled options
        this.shuffledOptionsMap.set(preguntaId, opciones);
        return opciones.map(opcion => {
            const opcionId = Number(String(opcion.id).replace(/^o/, '')); // Numeric ID
            return `
            <div id="option-${opcionId}-${preguntaId}" class="option">
                <span class="bullet"><span class="dot-small"></span></span>
                <span class="option-text">${utilHtmlJuegos.escapeHtml(opcion.texto)}</span>
            </div>`;
        }).join('');
    };




    /**
     * Actualiza visualmente la barra de progreso del test según la posición de la pregunta actual.
     *
     * @param {number} posicion - Índice de la pregunta actual (empezando desde 0).
     * @returns {void} Modifica el estilo de ancho de la barra de progreso en el DOM.
     *
     * @description
     * La función calcula el porcentaje de progreso dividiendo la posición actual de la pregunta
     * entre el total de preguntas y multiplicando por 100. Luego selecciona el elemento que representa
     * la barra de progreso con el selector '.progress .bar' y ajusta su propiedad 'width' al porcentaje calculado.
     * Si no hay preguntas o el elemento de la barra no existe, no hace nada.
     *
     * @example
     * // Para la segunda pregunta de un test de 5 preguntas:
     * actualizarBarraProgreso(1);
     * // La barra de progreso se ajustará al 40%.
     */

    actualizarBarraProgreso = (posicion) => {
        const totalPreguntas = this.listaPreguntas.length;
        const porcentaje = totalPreguntas > 0 ? ((posicion + 1) / totalPreguntas) * 100 : 0;
        const barra = this.shadowRoot.querySelector('.progress .bar');
        if (barra) barra.style.width = `${porcentaje}%`;
    };




    /**
     * Muestra un mensaje de error temporal en una pregunta cuando el usuario no ha seleccionado ninguna opción.
     *
     * @param {HTMLElement} preguntaElement - El contenedor de la pregunta en el DOM donde se mostrará el error.
     * @returns {void} Inserta o actualiza un div de error dentro del footer de la pregunta y lo oculta automáticamente después de 3 segundos.
     *
     * @description
     * La función primero verifica si ya existe un elemento con la clase 'error-message' dentro de la pregunta.
     * Si no existe, lo crea, le asigna la clase correspondiente y algunos estilos CSS, y lo inserta al inicio del
     * footer de la pregunta ('.q-footer'). Luego establece el texto de error indicando que se debe seleccionar una opción.
     * Finalmente, utiliza setTimeout para limpiar el mensaje después de 3 segundos.
     *
     * @example
     * const pregunta = document.getElementById('pregunta-1');
     * mostrarError(pregunta);
     * // Se mostrará el mensaje "Por favor, selecciona una opción antes de continuar" durante 3 segundos.
     */

    mostrarError = (preguntaElement) => {
        let errorElement = preguntaElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #dc2626; margin-top: 10px; font-size: 14px;';
            preguntaElement.querySelector('.q-footer').prepend(errorElement);
        }
        errorElement.textContent = 'Por favor, selecciona una opción antes de continuar';

        setTimeout(() => {
            errorElement.textContent = '';
        }, 3000);
    };





    /**
     * Configura los eventos de navegación (Siguiente y Anterior) para una pregunta.
     * @param {HTMLElement} btnNext - Botón "Siguiente"
     * @param {HTMLElement} btnPrev - Botón "Anterior"
     * @param {number} index - Índice de la pregunta actual
     * @param {HTMLElement} preguntaElement - Elemento contenedor de la pregunta
     * @param {Function} callbacktieneOpcionSeleccionada - Función que devuelve true si alguna opción está seleccionada
     */

    configurarEventoNavegacionPaginada(btnNext, btnPrev, index, preguntaElement, callbacktieneOpcionSeleccionada) {
        if (btnNext) {
            btnNext.onclick = () => {
                if (callbacktieneOpcionSeleccionada()) {
                    this.mostrarPregunta(index + 1);
                } else {
                    this.mostrarError(preguntaElement);
                }
            };
        }
        if (btnPrev) {
            btnPrev.onclick = () => this.mostrarPregunta(index - 1);
        };
    }



    /**
     * Configura el evento para finalizar el test.
     * @param {HTMLElement} btnFinish - Botón "Finalizar"
     * @param {HTMLElement} preguntaElement - Elemento contenedor de la pregunta
     * @param {Function} callbacktieneOpcionSeleccionada - Función que devuelve true si alguna opción está seleccionada
     */

    configurarEventoFinalizar(btnFinish, preguntaElement, callbacktieneOpcionSeleccionada) {
        if (btnFinish) {
            btnFinish.onclick = async () => {
                if (callbacktieneOpcionSeleccionada()) {
                    const divStack = this.shadowRoot.getElementById('div-stack');
                    divStack.innerHTML = `<div class="spinner"></div><span class="cargando">Cargando...</span>`;
                    try {
                        const respuestas = this.test.obtenerRespuestas();
                        if (!respuestas.length) {
                            throw new Error('No hay respuestas seleccionadas para enviar.');
                        }
                        // Optional: Require all questions answered
                        if (respuestas.length < this.listaPreguntas.length) {
                            throw new Error('Por favor, responde todas las preguntas antes de finalizar.');
                        }
                        const serverResponse = await enviarRespuestasTest(respuestas, this.getAttribute('id-test') || null);
                        console.log(respuestas)
                        this.mostrarResultados(serverResponse.detalle);
                        this.actualizarResumen(
                            serverResponse.totalFallos,
                            this.test.obtenerCantidadOpcionesCorrectas(serverResponse.detalle),
                            Number(serverResponse.calificacion).toFixed(2),
                            false, // reiniciar
                            utilHtmlJuegos.escapeHtml(serverResponse.mensaje),
                            serverResponse.totalAciertos,


                        );

                    } catch (error) {
                        console.error('Error en guardarRespuestas:', error);
                        let errorMessage = 'Error al enviar las respuestas.';
                        if (error.message.includes('The JSON value could not be converted')) {
                            errorMessage += ' Formato de datos inválido. Verifica los IDs de preguntas y opciones.';
                        } else if (error.message.includes('No se recibieron respuestas')) {
                            errorMessage += ' No se enviaron respuestas válidas.';
                        }
                        divStack.innerHTML = `<p>${errorMessage}</p>`;
                    }
                } else {
                    this.mostrarError(preguntaElement);
                }
            };
        }
    }



    /**
     * Configura el evento de selección de opciones para una pregunta.
     * @param {NodeListOf<HTMLElement>} options - Lista de botones/elementos de opción
     * @param {HTMLElement} preguntaElement - Contenedor de la pregunta
     */


    configurarEventoPreguntas(options, preguntaElement) {
        options.forEach(option => {
            option.onclick = () => {
                const tipo = preguntaElement.getAttribute('data-tipo');
                if (tipo === 'unica') {
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                } else if (tipo === 'multiple') {
                    option.classList.toggle('selected');
                }
                const errorElement = preguntaElement.querySelector('.error-message');
                if (errorElement) errorElement.textContent = '';
                const id = option.id;
                const partes = id.split('-');
                if (partes.length !== 3) {
                    console.error(`Formato de ID inválido: ${id}`);
                    return;
                }
                const idOpcion = partes[1];
                const idPregunta = partes[2];
                this.test.responder(idPregunta, idOpcion);
            };
        });
    }




    /**
     * Inicializa los eventos de navegación y selección para una pregunta del test.
     *
     * @param {HTMLElement} preguntaElement - El contenedor HTML que representa la pregunta actual.
     * @param {number} index - El índice de la pregunta dentro de la lista total de preguntas.
     *
     * @description
     * Esta función:
     * 1. Obtiene los botones de navegación (`.next`, `.prev`, `.finish`) y las opciones de respuesta (`.option`) dentro de la pregunta.
     * 2. Define una función auxiliar (`tieneOpcionSeleccionada`) que valida si el usuario ya seleccionó una respuesta.
     * 3. Configura los eventos de:
     *    - **Navegación paginada** entre preguntas (siguiente y anterior).
     *    - **Finalización del test** al presionar el botón de finalizar.
     *    - **Selección de respuestas** para registrar la opción elegida.
     *
     * @example
     * // Suponiendo que `preguntaElement` es un <div> con botones y opciones:
     * this.iniciarEventoPreguntas(preguntaElement, 0);
     * // Resultado: Los botones "Next", "Prev" y "Finish" tendrán eventos asociados,
     * // y las opciones de respuesta reaccionarán al hacer click.
     */

    iniciarEventoPreguntas = (preguntaElement, index) => {
        const btnNext = preguntaElement.querySelector(".next");
        const btnPrev = preguntaElement.querySelector(".prev");
        const btnFinish = preguntaElement.querySelector(".finish");
        const options = preguntaElement.querySelectorAll(".option");
        const tieneOpcionSeleccionada = () => preguntaElement.querySelector('.option.selected') !== null;

        this.configurarEventoNavegacionPaginada(btnNext, btnPrev, index, preguntaElement, tieneOpcionSeleccionada);
        this.configurarEventoFinalizar(btnFinish, preguntaElement, tieneOpcionSeleccionada);
        this.configurarEventoPreguntas(options, preguntaElement);

    };



    /**
     * Devuelve una descripción legible del tipo de pregunta.
     *
     * @param {string} categoria - La categoría de la pregunta, que puede ser 'multiple' o cualquier otro valor para selección única.
     * @returns {string} Una cadena que describe si la pregunta es de "Selección múltiple" o "Selección única".
     *
     * @description
     * La función verifica si la categoría es exactamente 'multiple'. Si es así, devuelve "Selección múltiple";
     * de lo contrario, devuelve "Selección única". Esto se utiliza para mostrar información al usuario sobre el tipo de pregunta.
     *
     * @example
     * mostrarTipoPregunta('multiple'); // Devuelve "Selección múltiple"
     * mostrarTipoPregunta('unica');    // Devuelve "Selección única"
     */

    mostrarTipoPregunta(categoria) {
        return categoria === 'multiple' ? 'Selección múltiple' : 'Selección única';
    }

    /**
   * Muestra la pregunta correspondiente según la posición actual y actualiza la barra de progreso.
   *
   * @param {Array} listaPreguntas - Array de objetos que representan todas las preguntas del test.
   * @param {number} posicionPregunta - Índice de la pregunta actual a mostrar.
   * @returns {void} Renderiza la pregunta en el DOM y configura los eventos de interacción.
   *
   * @description
   * La función primero actualiza la barra de progreso según la posición de la pregunta.
   * Si el contenedor 'divStack' está vacío, recorre todas las preguntas y genera el HTML
   * de cada pregunta, incluyendo meta información, título, opciones y botones de navegación.
   * Luego selecciona todas las preguntas en el DOM y les asigna clases CSS para control visual:
   * - "active" para la pregunta actual.
   * - "exit-left" para preguntas anteriores.
   * - "exit-right" para preguntas posteriores.
   * Además, llama a `configurarEventosPregunta` para asignar los eventos onclick correspondientes
   * a botones y opciones de la pregunta activa.
   *
   * @example
   * mostrarPregunta(listaPreguntas, 0);
   * // Muestra la primera pregunta y configura sus eventos
   */

    mostrarPregunta(posicion) {
        this.posicionPregunta = posicion;
        this.actualizarBarraProgreso(posicion);
        const divStack = this.shadowRoot.getElementById('div-stack');
        if (divStack.innerHTML === '' || divStack.querySelector('.spinner')) {
            divStack.innerHTML = '';
            this.listaPreguntas.forEach((pregunta, index) => {
                const preguntaId = Number(String(pregunta.id).replace(/^pregunta/, ''));
                divStack.innerHTML += `
          <section id="pregunta-${preguntaId}" class="q-block" data-tipo="${pregunta.categoria}">
            <div class="q-meta">
              <span class="pill">Pregunta ${index + 1}/${this.listaPreguntas.length}</span>
              <span class="muted">${this.mostrarTipoPregunta(pregunta.categoria)}</span>
            </div>
            <h2 class="q-title">${utilHtmlJuegos.escapeHtml(pregunta.titulo)}</h2>
            <div class="options">${this.obtenerOpcionesHTML(pregunta)}</div>
            <div class="q-footer">
              <div class="left"><div class="result"></div></div>
              <div class="right">${this.crearBotones(index, this.listaPreguntas.length)}</div>
            </div>
          </section>`;
            });
        }
        const preguntas = divStack.querySelectorAll('.q-block');
        preguntas.forEach((pregunta, index) => {
            pregunta.classList.remove('active', 'exit-left', 'exit-right');
            if (index === posicion) {
                pregunta.classList.add('active');
                this.iniciarEventoPreguntas(pregunta, index);
            } else if (index < posicion) {
                pregunta.classList.add('exit-left');
            } else {
                pregunta.classList.add('exit-right');
            }
        });
    }


    /**
     * Renderiza una opción de respuesta con sus estados (seleccionada, correcta/incorrecta).
     * 
     * @param {Object} op - Opción de la pregunta.
     * @param {Object|null} respuestaSeleccionada - Respuesta seleccionada desde el servidor (si existe).
     * @param {string} _PUBLIC - Ruta pública para los iconos.
     * @returns {string} HTML de la opción renderizada.
     */

    renderOpcion(op, respuestaSeleccionada) {
        const idOp = Number(String(op.id).replace(/^o/, ''));
        let seleccionada = false;
        let esCorrecta = false;
        if (respuestaSeleccionada) {
            const opcionServer = respuestaSeleccionada.opciones.find(o => o.idOpcion === idOp);
            seleccionada = opcionServer ? opcionServer.seleccionada : false;
            esCorrecta = opcionServer ? opcionServer.esCorrecta : false;
        }
        const classes = ['option'];
        if (seleccionada) classes.push('selected');
        let iconoExtra = '';
        if (esCorrecta) {
            classes.push('correct');
            iconoExtra = `<img src="${this.correctaSVG}" alt="Correcto" class="icono-respuesta" onerror="this.outerHTML='✔️'">`;
        } else if (seleccionada && !esCorrecta) {
            classes.push('wrong');
            iconoExtra = `<img src="${this.incorrectaSVG}" alt="Incorrecto" class="icono-respuesta" onerror="this.outerHTML='❌'">`;
        }
        return `
      <div class="${classes.join(' ')}" data-id="${op.id}">
        <span class="bullet"><span class="dot-small"></span></span>
        <span class="option-text">${utilHtmlJuegos.escapeHtml(op.texto)}<strong>${iconoExtra}</strong></span>
      </div>`;
    }

    /**
     * Renderiza la retroalimentación para las opciones seleccionadas de una pregunta.
     * 
     * @param {Object} pregunta - Pregunta actual con sus opciones.
     * @param {Object|null} respuestaSeleccionada - Respuesta seleccionada desde el servidor (si existe).
     * @returns {string} HTML de retroalimentación (puede estar vacío).
     */
    renderRetro(pregunta, respuestaSeleccionada) {
        if (!respuestaSeleccionada) return '';

        return respuestaSeleccionada.opciones
            .filter(o => o.seleccionada && o.retroalimentacion && o.retroalimentacion.trim())
            .map(o => {
                return `<div class="retroalimentacion">${utilHtmlJuegos.escapeHtml(o.retroalimentacion)}</div>`;
            })
            .join('');
    }
    /**
 * Renderiza el bloque completo de una pregunta con sus opciones y retroalimentación.
 * 
 * @param {Object} pregunta - Pregunta actual.
 * @param {number} index - Índice de la pregunta en la lista.
 * @param {Array} listaPreguntas - Lista completa de preguntas.
 * @param {Object|null} respuestaSeleccionada - Respuesta seleccionada desde el servidor (si existe).
 * @param {string} opcionesHTML - HTML con las opciones ya renderizadas.
 * @param {string} retroHTML - HTML con retroalimentación ya renderizada.
 * @returns {string} HTML completo de la pregunta.
 */


    renderPregunta(pregunta, index, respuestaSeleccionada) {
        const preguntaId = Number(String(pregunta.id).replace(/^pregunta/, ''));
        const opciones = this.shuffledOptionsMap.get(preguntaId) || pregunta.opciones;
        const opcionesHTML = opciones.map(op => this.renderOpcion(op, respuestaSeleccionada)).join('');
        const retroHTML = this.renderRetro(pregunta, respuestaSeleccionada);
        return `
      <section id="pregunta-${preguntaId}" class="q-block" style="margin-bottom: 20px;">
        <div class="q-meta">
          <span class="pill">Pregunta ${index + 1}/${this.listaPreguntas.length}</span>
          <span class="muted">${this.mostrarTipoPregunta(pregunta.categoria)}</span>
        </div>
        <h2 class="q-title">${utilHtmlJuegos.escapeHtml(pregunta.titulo)}</h2>
        <div class="options">${opcionesHTML}</div>
        ${retroHTML}
        <div class="q-footer">
          <div class="left">
            <div class="result">
              ${respuestaSeleccionada
                ? (respuestaSeleccionada.correcta
                    ? '<span class="correct">Respuesta correcta</span>'
                    : '<span class="wrong">Respuesta incorrecta</span>')
                : '<span class="wrong">No respondida</span>'}
            </div>
          </div>
        </div>
      </section>`;
    }



    /**
     * Muestra los resultados finales del test, incluyendo selección del usuario, aciertos, errores y retroalimentación.
     *
     * @param {Array} detalleServidor - Array de objetos que representa la respuesta del servidor,
     *                                  cada objeto contiene idPregunta y opciones con sus estados.
     *                                  Por defecto es un array vacío.
     * @returns {void} Renderiza todas las preguntas con sus resultados en el contenedor `divStack`.
     *
     * @description
     * La función limpia el contenedor principal `divStack` y recorre todas las preguntas.
     * Para cada pregunta:
     * - Obtiene el ID numérico de la pregunta eliminando el prefijo "pregunta".
     * - Busca la respuesta seleccionada por el usuario en `detalleServidor`.
     * - Obtiene las opciones mezcladas desde `shuffledOptionsMap` o, en su defecto, las originales.
     * - Construye el HTML de cada opción incluyendo:
     *   - Clase "selected" si fue seleccionada.
     *   - Clase "correct" si la opción es correcta.
     *   - Clase "wrong" si la opción fue seleccionada pero incorrecta.
     *   - Iconos de correcto/incorrecto con fallback en texto si no se carga la imagen.
     * - Genera retroalimentación para las opciones seleccionadas si existe.
     * - Inserta todo el HTML de la pregunta en el DOM.
     * Finalmente, asegura que cada pregunta tenga estilos `position: relative`, `left: 0` y `opacity: 1`.
     *
     * @example
     * mostrarResultados([
     *   { idPregunta: 1, correcta: true, opciones: [{idOpcion: 1, seleccionada: true, es_correcta: true}] }
     * ]);
     * // Renderiza la pregunta 1 con la opción seleccionada marcada y correcta
     */


    mostrarResultados(detalleServidor = []) {


        const divStack = this.shadowRoot.getElementById('div-stack');
        divStack.innerHTML = '';
        this.listaPreguntas.forEach((pregunta, index) => {
            const preguntaId = Number(String(pregunta.id).replace(/^pregunta/, ''));
            const respuestaSeleccionada = detalleServidor.find(r => r.idPregunta === preguntaId);
            divStack.innerHTML += this.renderPregunta(pregunta, index, respuestaSeleccionada);
        });
        divStack.querySelectorAll('.q-block').forEach(p => {
            p.style.position = 'relative';
            p.style.left = '0';
            p.style.opacity = '1';
        });
    }



    /**
     * Actualiza el resumen del test, mostrando estadísticas y mensaje final, y opcionalmente reinicia el test.
     *
     * @param {number} fallos - Cantidad de respuestas incorrectas.
     * @param {number} correctas - Cantidad de respuestas correctas.
     * @param {number} calificacion - Porcentaje de aciertos.
     * @param {boolean} [reiniciar=false] - Indica si se está reiniciando el test. Si es true, solo muestra el mensaje inicial.
     * @param {string} mensaje - Mensaje que se mostrará al usuario, puede incluir variables para interpolar.
     * @returns {void} Actualiza el DOM con los resultados o mensaje inicial y añade la imagen de mascota.
     *
     * @description
     * - Si `reiniciar` es true, limpia el resumen, muestra el mensaje inicial y vuelve a insertar la imagen `img`.
     * - Si `reiniciar` es false, muestra en `summaryDiv` la cantidad de respuestas correctas, fallos y calificación.
     * - Interpola variables en el mensaje usando `interpolarMensaje`.
     * - Convierte los links del mensaje a un estilo adecuado con `convertirLinkConEstilo`.
     * - Inserta la imagen `img` al final del mensaje en `pet-test-text`.
     *
     * @example
     * actualizarResumen(2, 8, 80, false, "¡Buen trabajo! Tu nota es {nota}%");
     * // Muestra el resumen con estadísticas y mensaje final, manteniendo la imagen visible
     */





    actualizarResumen(fallos, correctas, calificacion, reiniciar = false, mensaje, totalPreguntasCorrectas) {
        const summaryDiv = this.shadowRoot.querySelector('.summary');
        const petTestText = this.shadowRoot.getElementById('pet-test-text');
        if (reiniciar) {
            summaryDiv.innerHTML = '';
            petTestText.innerHTML = convertirLinkConEstiloTest(interpolarMensajeTest(mensaje, { nota: 0, correctas: 0, fallos: 0 }));
            petTestText.appendChild(this.img);
            return;
        }
        summaryDiv.innerHTML = `
    <div title="Número de preguntas donde todas las opciones correctas fueron seleccionadas de todas las preguntas del test.">
        Items correctos: <strong>${totalPreguntasCorrectas}</strong> de <strong>${this.listaPreguntas.length}</strong>
    </div>
    <div title="Número total de opciones correctas seleccionadas.">
        Selecciones correctas: <strong>${correctas}</strong>
    </div>
    <div title="Número total de respuestas incorrectas seleccionadas.">
        Selecciones incorrectas: <strong>${fallos}</strong>
    </div>
    <div title="Porcentaje de preguntas correctas sobre el total.">
        Calificación: <strong>${calificacion}%</strong>
    </div>
`;



        petTestText.innerHTML = convertirLinkConEstiloTest(interpolarMensajeTest(mensaje, { nota: calificacion, correctas, fallos }));
        petTestText.appendChild(this.img);
    }


    /**
     * Reinicia el examen, recargando las preguntas desde el servidor y restableciendo el estado del test.
     *
     * @async
     * @returns {Promise<void>} Reinicia el test, actualiza el DOM y muestra el mensaje inicial.
     *
     * @description
     * - Llama al método `reiniciar` del objeto `test` si existe.
     * - Limpia el contenedor `divStack`.
     * - Obtiene nuevas preguntas desde la función asincrónica `obtenerPreguntas`.
     * - Convierte las preguntas recibidas con `mapearPreguntaAPI` y filtra elementos inválidos.
     * - Crea un nuevo objeto `Test` con las preguntas procesadas.
     * - Inicializa `posicionPregunta` en 0.
     * - Muestra la primera pregunta con `mostrarPregunta`.
     * - Actualiza la barra de progreso.
     * - Llama a `actualizarResumen` con valores iniciales y el mensaje de detalle de la API.
     *
     * @example
     * reiniciarExamen();
     * // El examen se reinicia, las preguntas se recargan y se muestra el mensaje inicial.
     */

    async reiniciarExamen() {
        if (this.test) this.test.reiniciar();
        await this.cargarTest(true);
    }

    /**
     * Inicializa el test cargando preguntas desde el servidor y configurando el estado inicial.
     *
     * @async
     * @returns {Promise<void>} Carga las preguntas, crea un nuevo test, y muestra la primera pregunta.
     *
     * @description
     * - Llama a la función asincrónica `obtenerPreguntas` para obtener las preguntas del servidor.
     * - Accede al array de preguntas dentro del objeto devuelto (`juegoConPreguntas.preguntas`).
     * - Procesa cada pregunta usando `mapearPreguntaAPI` y filtra cualquier valor nulo.
     * - Crea un nuevo objeto `Test` con las preguntas válidas.
     * - Inicializa `posicionPregunta` en 0 y limpia el contenedor `divStack`.
     * - Muestra la primera pregunta con `mostrarPregunta`.
     * - Actualiza la barra de progreso y el resumen inicial con `actualizarResumen`.
     * - Si no se reciben preguntas, muestra un mensaje de error en el contenedor.
     *
     * @example
     * iniciarTest();
     * // Carga las preguntas del test y muestra la primera pregunta lista para interactuar
     */

    async iniciarTest() {
        await this.cargarTest(true);
    }


    /**
     * Carga preguntas desde el servidor, inicializa el test y configura la UI inicial.
     *
     * @async
     * @param {boolean} limpiar - Indica si se debe limpiar el contenedor al iniciar.
     * @returns {Promise<void>}
     */

    async cargarTest(limpiar = true) {
        const juegoConPreguntas = await obtenerPreguntasTest(this.getAttribute('id-test') || null);
        const tituloTest = this.shadowRoot.getElementById('titulo-test');
        tituloTest.innerText = juegoConPreguntas.nombre ?? "Test no disponible";
        tituloTest.title = juegoConPreguntas.descripcion?.trim()
            ? juegoConPreguntas.descripcion
            : "En preguntas únicas, la opción correcta vale 1 punto. En preguntas múltiples, cada opción correcta vale parte del punto, y se obtiene el punto completo solo si se seleccionan todas sin errores.";
        const preguntasAPI = juegoConPreguntas?.preguntas || [];
        if (preguntasAPI.length > 0) {
            this.listaPreguntas = preguntasAPI
                .map(mapearPreguntaAPITest)
                .filter(p => p !== null);
            this.test = new Test(this.listaPreguntas);
            this.posicionPregunta = 0;
            if (limpiar) {
                const divStack = this.shadowRoot.getElementById('div-stack');
                divStack.innerHTML = '';
            }
            this.mostrarPregunta(0);
            this.actualizarBarraProgreso(this.posicionPregunta);
            this.actualizarResumen(0, 0, 0, true, utilHtmlJuegos.escapeHtml(juegoConPreguntas.detalle), 0);
            this.shadowRoot.querySelector('.summary').innerHTML = tituloTest.title;

        } else {
            const divStack = this.shadowRoot.getElementById('div-stack');
            divStack.innerHTML = '<p>Error al cargar el test</p>';
        }
    }



    /**
     * Inicializa el test cargando preguntas desde el servidor y configurando el estado inicial.
     *
     * @async
     * @returns {Promise<void>} Carga las preguntas, crea un nuevo test, y muestra la primera pregunta.
     *
     * @description
     * - Llama a la función asincrónica `obtenerPreguntas` para obtener las preguntas del servidor.
     * - Accede al array de preguntas dentro del objeto devuelto (`juegoConPreguntas.preguntas`).
     * - Procesa cada pregunta usando `mapearPreguntaAPI` y filtra cualquier valor nulo.
     * - Crea un nuevo objeto `Test` con las preguntas válidas.
     * - Inicializa `posicionPregunta` en 0 y limpia el contenedor `divStack`.
     * - Muestra la primera pregunta con `mostrarPregunta`.
     * - Actualiza la barra de progreso y el resumen inicial con `actualizarResumen`.
     * - Si no se reciben preguntas, muestra un mensaje de error en el contenedor.
     *
     * @example
     * iniciarTest();
     * // Carga las preguntas del test y muestra la primera pregunta lista para interactuar
     */

}


// Registrar el componente
customElements.define('test-component', TestComponent);
