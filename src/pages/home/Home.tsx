import React from 'react'

function Home() {
  return (
    <>
      <div className='bg-indigo-900 text-white text-xl flex items-center justify-around min-h-[20vh]'>
        <img src="https://i.imgur.com/0Hpwnjx.png" alt="" className='w-56' />
        <h3 className='text-2xl w-96 text-center font-semibold'>Perca-se nas páginas de infinitas aventuras! Sua livraria favorita aguarda por você.</h3>
      </div>
      <div className="container mx-auto">
        <h2 className="text-3xl text-indigo-800 text-center mt-8 font-bold">Catalogo de livros</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Array.from({length: 5}).map(() => (
            <div className="flex flex-col rounded border p-2">
              <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="" />
              <h3>Titulo do livro</h3>
              <p>Autor: Thiago</p>
              <p>Preço: R$ 1,99</p>
              <div className='flex gap-4 w-full'>
                <button className='w-full rounded py-2 bg-sky-400 text-white font-bold'>Editar</button>
                <button className='w-full rounded py-2 bg-red-400 text-white font-bold'>Apagar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home