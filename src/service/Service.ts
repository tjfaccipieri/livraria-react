import axios from "axios";

// Criamos aqui um link direto para o deploy do backend, atravez da basicURL, para não ter que ficar repetindo o endereço em todas as requisições
export const api = axios.create({
  baseURL:'https://livraria-spring.onrender.com/'
})

// criando método de post sem a necessidade de token, para cadastrar e logar o usuário
export const cadastro = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

// Criação dos métodos do CRUD que irão precisar de Token, sendo passado no atributo header
export const get = async(url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url,header)
  setDados(resposta.data)
}

export const post = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}

export const put = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}

export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header)
}