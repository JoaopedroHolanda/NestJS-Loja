import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO} from './CriaProduto.dto';
export class AtualizaProdutoDTO {

  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsOptional()
  quantidade: number;

  @IsString()
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  
  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  @IsOptional()
  categoria: string;
}