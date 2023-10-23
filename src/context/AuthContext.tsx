import { ReactNode, createContext, useState } from "react";
import { UsuarioLogin } from "../model/UsuarioLogin";
import { login } from "../service/Service";


// Criação de uma interface para tipagem das funções e variáveis que serão utilizadas na Context.. caso preciso, podemos expandir, passando mais atributos, para uma context maior
interface AuthContextProps {
  usuario: UsuarioLogin,
  handleLogin(usuario: UsuarioLogin): Promise<void>,
  handleLogout(): void
}

// Criação da interface do Provider, informando que o atributo children é um ReactNode, que nada mais é do que qlquer componente da aplicação
interface AuthProviderProps {
  children: ReactNode
}

// Criação/Exportação da AuthContext em sí, com todas as funções que existem nas Props
export const AuthContext = createContext({} as AuthContextProps)

// Criação do Provider da Context, que irá receber o children, e toda a lógica das funções que serão compartilhadas
export function AuthProvider({children}: AuthProviderProps) {

  // Estado para armazenar os dados do usuário que está logado
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: ''
  })
  
  
  // Função que irá fazer o login, irá receber os dados do formulario que vem do Login.tsx, e tentar logar no backend
  async function handleLogin(userLogin: UsuarioLogin){
    try {
      await login('/usuarios/logar', userLogin, setUsuario)
      alert('Usuario conectado com sucesso')
      
    } catch (error) {
      console.log(error);
      alert('Dados inválidos, favor tentar novamente')
    }
  }

  // função de logout, que irá retornar o estado para o valor padrão, com todos os dados em branco, removendo o token de autenticação do usuário nesse processo
  function handleLogout() {
    setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
  }


  return(
    // Dentro do retorno da função, criamos o ContextProvider, que irá repassar as funções da Props para dentro do Children, essa parte é padrão para projetos com Context
    <AuthContext.Provider value={{handleLogout, handleLogin, usuario}}>
      {children}
    </AuthContext.Provider>
  )
}