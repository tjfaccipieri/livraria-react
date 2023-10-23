import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Produto } from '../../../model/Produto';
import { get, post, put } from '../../../service/Service';

function FormularioProduto() {
  // Criação da instancia de Produto, seguindo a modelagem dos dados
  const [produto, setProduto] = useState<Produto>({} as Produto);

  // Importação do usuário da context, para utilizarmos o token
  const { usuario } = useContext(AuthContext);

  // Hook interno do react-router-dom, para navegação automatizada do usuário
  const navigate = useNavigate();

  // O useParams vai conseguir ler a URL da página, e nesse caso, estará buscando pela propriedade ID, caso exista, ele consegue armazenar ela na constante
  const {id} = useParams<{ id: string }>()

  // Função de atualização do formulário, repassando tbm o usuário para dentro do produto, de forma que o produto seja cadastrado com um usuário dono
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      usuario: usuario
    });
  }

  // Função que irá fazer o GET por ID do produto, caso o ID exista na URL
  async function getProduto(id: string) {
    await get(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: usuario.token
      }
    })
  }
  // Efeito que irá disparar a função acima
  useEffect(() => {
    getProduto(id!)
  }, [id])

  // Função que irá fazer tanto o cadastro de um novo produto, como a atualização de um produto existente, com base em termos ou não um ID nos parametros da rota: Caso tenha um ID, irá rodar um PUT, caso contrario, um POST
  async function cadastrarProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if(produto.id !== undefined) {
      try {
        await put('/produtos', produto, setProduto, {
          headers: {
            Authorization: usuario.token
          }
        })
        alert('Produto atualizado com sucesso')
        navigate('/home')
      } catch (error) {
        console.log(error);
        alert('Falha ao atualizar o produto, por favor, verifique os campos novamente')
      }
    } else {
      try {
        await post('/produtos', produto, setProduto, {
          headers: {
            Authorization: usuario.token
          }
        })
        alert('Produto cadastrado com sucesso')
        navigate('/home')
      } catch (error) {
        console.log(error);
        alert('Falha ao cadastrar o produto, por favor, verifique os campos novamente')
      }
    }
  }

  return (
    <div className="container mx-auto my-10 flex justify-center">
      <form
        className="flex flex-col items-center gap-4 w-1/2"
        onSubmit={cadastrarProduto}
      >
        <h2 className="text-3xl font-black text-indigo-800">
          Formulário de {produto.id !== 0 ? 'cadastro' : 'atualização'} de
          produto
        </h2>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="titulo">Titulo do livro</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="titulo"
            name="titulo"
            value={produto.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="autor">Autor do livro</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="autor"
            name="autor"
            value={produto.autor}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="sinopse">Sinopse do livro</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="sinopse"
            name="sinopse"
            value={produto.sinopse}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="editora">Editora do livro</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="editora"
            name="editora"
            value={produto.editora}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="foto">Foto da capa</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="foto"
            name="foto"
            value={produto.foto}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <label htmlFor="preco">Preço do livro</label>
          <input
            className="border-indigo-950 rounded border px-2 py-1 text-lg"
            type="text"
            placeholder="Título do livro aqui"
            required
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              atualizarEstado(event)
            }
          />
        </section>

        <div className="flex gap-8 w-full">
          <Link
            to="/home"
            className="rounded bg-red-400 hover:bg-red-800 w-full py-2 text-white font-bold text-center"
          >
            Cancelar
          </Link>
          <button className="rounded bg-indigo-400 hover:bg-indigo-800 w-full py-2 text-white font-bold">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioProduto;
