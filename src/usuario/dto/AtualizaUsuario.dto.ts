import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"
import { EmailUnico } from "../validacao/emailUnico.validator"

export class AtualizaUsuarioDTO{

    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string


    @IsEmail(undefined, {message: 'O email informado é inválido'})
    @EmailUnico({message: 'Já existe um usuário com este email'})
    @IsOptional()
    email: string

    @MinLength(6, {message: 'A senha deve conter ao menos 6 caracteres'})
    @IsOptional()
    senha:string
}

