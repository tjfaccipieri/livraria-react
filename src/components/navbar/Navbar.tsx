import React from 'react'

function Navbar() {
  return (
    <div className='py-2 px-8 flex justify-between items-center bg-indigo-900 text-white font-semibold'>
      <h2 className='text-3xl'>Livraria Dahora</h2>
      <ul className='flex gap-4'>
        <li>Catalogo</li>
        <li>Cadastrar Produto</li>
        <li>Perfil</li>
        <li>Sair</li>
      </ul>
    </div>
  )
}

export default Navbar