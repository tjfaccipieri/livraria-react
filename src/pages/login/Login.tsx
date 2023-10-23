import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { UsuarioLogin } from '../../model/UsuarioLogin';
import { login } from '../../service/Service';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

  // estado que irá armazenar as informações digitadas no formulário pelo usuário
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

  // importação da Context, para usarmos a função de Login e o estado do usuário após o Login
  const {handleLogin, usuario} = useContext(AuthContext)

  const navigate = useNavigate()


  // função para automatização do formulário, sempre que o usuário digitar no campo, essa função já atualiza a model com o dado no atributo correto.
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })

    console.log(usuario);
  }

  // Efeito que irá rodar sempre que o usuário da context for atualizado, verificando se o token está em branco ou não. Caso possua token, o usuário será redirecionado para a tela de /Home
  useEffect(() => {
    if (usuario.token !== "") {
        navigate('/home')
    }
}, [usuario])

// função de login, que irá prevenir a atualização da tela, e irá chamar a função de login do Context.
  function logar(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    handleLogin(usuarioLogin)
  }
  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
      <form className="flex flex-col items-center gap-8 w-2/5" onSubmit={logar}>
        <h2 className="text-6xl font-extrabold text-indigo-800">Cadastrar</h2>
        
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="usuario">Nome de usuário:</label>
          <input
            id="usuario"
            type="email"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="email@email.com"
            name="usuario"
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </section>
        
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="insira sua senha"
            name="senha"
            value={usuarioLogin.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </section>
        

        <div className="flex gap-8 w-full">
          
          <button
            type="submit"
            className="rounded bg-indigo-500 hover:bg-indigo-900 text-white w-full text-xl py-2"
          >
            Conectar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login