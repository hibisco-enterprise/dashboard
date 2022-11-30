import axios from 'axios';

const apiIBGE = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
})

const apiViaCep = axios.create({
    baseURL: "https://viacep.com.br/ws"
})

const apiKitsune = axios.create({
    baseURL: "https://kitsune-ws.hopto.org",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json;charset=UTF-8"
    }
})

export { apiIBGE, apiViaCep, apiKitsune };