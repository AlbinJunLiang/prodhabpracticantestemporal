const SERVER = 'http://localhost:5133';
const ENVIRONMENTS = {
    development: {
        apiUrl: SERVER,
        debug: true,
    },
    production: {
        apiUrl: 'https://apipracticajuegos-crcxccchdhd0dcag.eastus2-01.azurewebsites.net',
        debug: false
    }
};

const CONFIG = ENVIRONMENTS.production;

