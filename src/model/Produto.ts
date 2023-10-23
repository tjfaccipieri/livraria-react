import { Usuario } from "./Usuario";

export interface Produto {
  id: number,
  titulo: string,
  autor: string,
  sinopse: string,
  editora: string,
  preco: number,
  foto: string,
  usuario: Usuario
}