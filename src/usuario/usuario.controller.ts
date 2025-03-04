import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository} from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4 as uuid} from "uuid"
import { ListausuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";


@Controller('/usuarios')
export class UsuarioController{

    constructor(private usuarioRepository: UsuarioRepository){
        
    }

    @Post()
    async criaUsuario (@Body() dadosDoUsuario: CriaUsuarioDTO){

        const usuarioEntity = new UsuarioEntity()
        usuarioEntity.email = dadosDoUsuario.email
        usuarioEntity.senha = dadosDoUsuario.senha
        usuarioEntity.nome = dadosDoUsuario.nome
        usuarioEntity.id = uuid()
    

        this.usuarioRepository.salvar(usuarioEntity)
        return {usuario: new ListausuarioDTO(usuarioEntity.id, usuarioEntity.nome), message: 'Usuário criado com sucesso'}
    }

    @Get()
    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.listar()
        
        const usuariosLista = usuariosSalvos.map(usuario => new ListausuarioDTO(usuario.id, usuario.nome))

        return usuariosLista
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() dadosParaAtualizar: AtualizaUsuarioDTO ){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, dadosParaAtualizar)
        return {usuario: usuarioAtualizado, message: "Usuário atualizado com sucesso"}
    }


    @Delete("/:id")
    async removeUsuario(@Param('id')id: string){
        const usuarioRemovido = await this.usuarioRepository.remove(id)

        return {usuario: usuarioRemovido, mensagem: "Usuário removido com sucesso"}
    }

}