import { ChangeEvent, useState } from "react";
import { Usuario } from "../../model/Usuario";
import { cadastro } from "../../service/Service";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario)

  const navigate = useNavigate()

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    await cadastro('/usuarios/cadastrar', usuario, setUsuario)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
      <form className="flex flex-col items-center gap-8 w-2/5" onSubmit={cadastrarUsuario}>
        <h2 className="text-6xl font-extrabold text-indigo-800">Cadastrar</h2>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="usuario">Nome completo:</label>
          <input
            id="nome"
            type="text"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="Nome completo"
            name="nome"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="usuario">Nome de usuário:</label>
          <input
            id="usuario"
            type="email"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="email@email.com"
            name="usuario"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="foto">Foto:</label>
          <input
            id="foto"
            type="text"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="URL da foto"
            name="foto"
            value={usuario.foto}
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
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="senha">Confirmar senha:</label>
          <input
            id="confirmSenha"
            type="password"
            className="rounded border-indigo-900 border px-2 py-1 text-lg"
            placeholder="confirme sua senha"
            name="confirmSenha"
          />
        </section>

        <div className="flex gap-8 w-full">
          <button
            type="button"
            className="rounded bg-red-500 hover:bg-red-900 text-white w-full text-xl py-2 text-center"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-500 hover:bg-indigo-900 text-white w-full text-xl py-2"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
