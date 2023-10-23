import React, { useContext, useEffect, useState } from 'react'
import { Produto } from '../../model/Produto'
import { get } from '../../service/Service'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function Home() {

  // criação de um array com o modelo de produto, para armazenarmos a lista de produtos que virá do GET do backend
  const [produtos, setProdutos] = useState<Produto[]>([])

  // importação do usuário da context, para usarmos o token
  const {usuario} = useContext(AuthContext)

  // função de busca dos produtos, repassando a url e o token do usuário
  async function buscarProdutos(){
    await get('/produtos/all', setProdutos, {
      headers: {
        Authorization: usuario.token
      }
    })
  }

  // efeito que irá disparar a busca de produtos assim que a página for carregada
  useEffect(() => {
    buscarProdutos()
  }, [])

  return (
    <>
      <div className='bg-indigo-900 text-white text-xl flex items-center justify-around min-h-[20vh]'>
        <img src="https://i.imgur.com/0Hpwnjx.png" alt="" className='w-56' />
        <h3 className='text-2xl w-96 text-center font-semibold'>Perca-se nas páginas de infinitas aventuras! Sua livraria favorita aguarda por você.</h3>
      </div>
      <div className="container mx-auto">
        <h2 className="text-3xl text-indigo-800 text-center mt-8 font-bold">Catalogo de livros</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* mapearemos o array de produtos, gerando uma repetição de todo o código interno, para cada produto da lista */}
          {produtos.map((produto) => (
            <div className="flex flex-col rounded border p-2">
              <img src={produto.foto} alt="" />
              <h3>{produto.titulo}</h3>
              <p>Autor: {produto.autor}</p>
              <p>Preço: R$ {produto.preco}</p>
              <div className='flex gap-4 w-full'>
                {/* criação de uma rota com variável, para passar o ID do produto na rota */}
                <Link to={`/editarProduto/${produto.id}`} className='w-full rounded py-2 bg-sky-400 text-white font-bold'>Editar</Link>
                <Link to={`/apagarProduto/${produto.id}`} className='w-full rounded py-2 bg-red-400 text-white font-bold'>Apagar</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home