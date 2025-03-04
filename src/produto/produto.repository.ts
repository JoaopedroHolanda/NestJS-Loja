import { Injectable } from "@nestjs/common"
import { ProdutoEntity } from "./produto.entity"

@Injectable()
export class ProdutoRepository{
    private produtos: ProdutoEntity[] = []
    
    async salvar(produto: ProdutoEntity){
        this.produtos.push(produto)
        return produto
    }

   async listar(){
    return this.produtos
   }

   private buscaPorId(id:string){
    const possivelProduto = this.produtos.find((produto)=> produto.id === id)

    if(!possivelProduto){
        throw new Error("Produto não existe")
    }

    return possivelProduto
   }

   async atualiza(id:string, dadosProduto: Partial<ProdutoEntity>){

    const produto = this.buscaPorId(id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (chave == "id") {
        return;
      }
      produto[chave] = valor;
    })
    return produto
   }

   async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }


}
//