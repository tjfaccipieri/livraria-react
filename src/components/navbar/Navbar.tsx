import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='py-2 px-8 flex justify-between items-center bg-indigo-900 text-white font-semibold'>
      <h2 className='text-3xl'>Livraria Dahora</h2>
      <ul className='flex gap-4'>
        <li>Catalogo</li>
        <li><Link to='/cadastroProduto'>Cadastrar Produto</Link></li>
        <li>Perfil</li>
        <li>Sair</li>
      </ul>
    </div>
  )
}

export default Navbar