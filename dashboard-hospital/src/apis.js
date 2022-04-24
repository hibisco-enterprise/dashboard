import axios from 'axios';

const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
})

const apiViaCep = axios.create({
  baseURL: "https://viacep.com.br/ws" 
})

const apiKitsune = axios.create({
  baseURL: "localhost:8080" 
})

export {apiIBGE, apiViaCep, apiKitsune};