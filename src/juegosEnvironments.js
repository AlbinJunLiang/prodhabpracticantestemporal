const SERVER = "http://localhost:5133";

const ENVIRONMENTS = {
    development: {
        apiUrl: SERVER,
        debug: true,
    },
    production: {
        apiUrl: SERVER,
        debug: false,
    }
};

let instance = null;

export class Config {
    constructor() {
        if (instance) return instance;

        const stored = localStorage.getItem("juego_prodhab_config");

        if (stored) {
            try {
                this.current = JSON.parse(stored);
            } catch {
                console.warn(" No se pudo parsear localStorage, usando production por defecto");
                this.current = { ...ENVIRONMENTS.production };
            }
        } else {
            this.current = { ...ENVIRONMENTS.production };
        }

        instance = this;
    }

    setEnvironment(envName) {
        if (ENVIRONMENTS[envName]) {
            this.current = { ...ENVIRONMENTS[envName] };
            this._save();
            console.log(` Entorno cambiado a: ${envName}`);
        } else {
            console.warn(` Entorno "${envName}" no existe.`);
        }
    }

    setApiUrl(newUrl) {
        this.current.apiUrl = newUrl;
        this._save();
        console.log(` URL actualizada a: ${newUrl}`);
    }

    get apiUrl() {
        return this.current.apiUrl;
    }

    get debug() {
        return this.current.debug;
    }

    _save() {
        try {
            localStorage.setItem("juego_prodhab_config", JSON.stringify(this.current));
        } catch (err) {
            console.error(" No se pudo guardar configuración en localStorage", err);
        }
    }
}
export const CONFIG_JUEGO_PRODHAB = new Config();
