import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { AuthProvider } from './context/AuthContext'
import FormularioProduto from './components/produtos/formularioProduto/FormularioProduto'
import DeletarProduto from './components/produtos/deletarProduto/DeletarProduto'

function App() {
  

  return (
    // AuthProvider por volta de todo o projeto, para que o projeto inteiro tenha acesso na Context
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              {/* Criação de rotas para cada um dos componentes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastroProduto" element={<FormularioProduto />} />
              {/* os componentes que precisarão de um ID do produto recebem o parametro :id no final */}
              <Route path="/editarProduto/:id" element={<FormularioProduto />} />
              <Route path="/apagarProduto/:id" element={<DeletarProduto />} />
            </Routes>
          </div>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
