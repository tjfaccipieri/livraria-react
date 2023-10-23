import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Produto } from '../../../model/Produto'
import { deletar, get } from '../../../service/Service'
import { AuthContext } from '../../../context/AuthContext'

function DeletarProduto() {
  // todas as constantes abaixo já estão comentadas no FormulárioProduto
  const {id} = useParams<{ id: string }>()
  const [produto, setProduto] = useState<Produto>({} as Produto)
  const {usuario} = useContext(AuthContext) 
  const navigate = useNavigate()

  async function getProduto(){
    try {
      await get(`/produtos/${id}`, setProduto, {
        headers: {
          Authorization: usuario.token
        }
      })
    } catch (error) {
      console.log(error);
      alert('O produto não foi encontrado')
      navigate('/home')
    }
  }

  useEffect(() => {
    getProduto()
  }, [id])

  // Função de apagar, que irá enviar um DELETE para o backend, com o ID do produto na rota
  async function apagar(){
    try {
      await deletar(`/produtos/${id}`, {
        headers: {
          Authorization: usuario.token
        }
      })
      alert('Produto apagado com sucesso')
      navigate('/home')
    } catch (error) {
      console.log(error);
      alert('O produto não pode ser apagado')
    }
  }

  

  return (
    <div className='flex flex-col gap-4 items-center'>
      <h2 className='text-3xl text-indigo-900'>Tem certeza de que deseja apagar o produto?</h2>
      <div className='flex flex-col items-center'>
        <img src={produto.foto} alt="" className='w-96 rounded-xl' />
        <h2>{produto.titulo}</h2>
        <p>{produto.editora}</p>
        <div className="flex gap-4 w-full text-white font-bold" >
          <Link className='rounded w-full bg-sky-600 hover:bg-sky-900 py-2 text-center' to='/home'>Cancelar</Link>
          <button type='button' className='rounded w-full bg-red-600 hover:bg-red-900 py-2 text-center' onClick={apagar}>Apagar</button>
        </div>
      </div>
    </div>
  )
}

export default DeletarProduto