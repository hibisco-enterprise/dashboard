import axios from 'axios';

const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
})

const apiViaCep = axios.create({
  baseURL: "https://viacep.com.br/ws" 
})

export {apiIBGE, apiViaCep};