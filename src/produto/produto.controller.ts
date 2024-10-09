import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { randomUUID } from "crypto";
import { ProdutoEntity } from "./produto.entity";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";

@Controller('/produtos')
export class ProdutoController{

    constructor(private produtoRepository: ProdutoRepository){}

    @Post()
    async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();
        produtoEntity.id = randomUUID();
        produtoEntity.nome = dadosProduto.nome;
        produtoEntity.usuarioId = dadosProduto.usuarioId;
        produtoEntity.valor = dadosProduto.valor;
        produtoEntity.quantidade = dadosProduto.quantidade;
        produtoEntity.descricao = dadosProduto.descricao;
        produtoEntity.categoria = dadosProduto.categoria;
        produtoEntity.caracteristicas = dadosProduto.caracteristicas;
        this.produtoRepository.salvar(produtoEntity);
        return {produto: new ListaProdutoDTO
          (produtoEntity.id,produtoEntity.usuarioId,produtoEntity.nome,produtoEntity.valor,produtoEntity.quantidade,produtoEntity.descricao,produtoEntity.categoria,produtoEntity.caracteristicas), 
          message: 'Produto criado com sucesso'}
      }


    @Get()
    async listaProdutos(){
      const produtosSalvos = await this.produtoRepository.listar()
        
      const produtosLista = produtosSalvos.map(produto => new ListaProdutoDTO(produto.id,produto.usuarioId,produto.nome,produto.valor,produto.quantidade,produto.descricao,produto.categoria,produto.caracteristicas))

      return produtosLista
    }

    @Put('/:id')
    async atualizaProduto(
      @Param('id') id: string,
      @Body() dadosProduto: AtualizaProdutoDTO,
    ) {
      const produtoAtualizado = await this.produtoRepository.atualiza(
        id,
        dadosProduto,
      )
      return {
        mensagem: 'produto atualizado com sucesso',
        produto: produtoAtualizado,
      };
    }
    
    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
      const produtoRemovido = await this.produtoRepository.remove(id)
      return {
        mensagem: 'produto removido com sucesso',
        produto: produtoRemovido,
      }
    }

}
