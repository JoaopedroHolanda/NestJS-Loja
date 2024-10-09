class CaracteristicaProduto {
    nome: string
    descricao: string
  }

  export class ProdutoEntity {
    id: string
    usuarioId: string
    nome: string
    valor: number
    quantidade: number
    descricao: string
    categoria: string
    caracteristicas: CaracteristicaProduto[]
  }
