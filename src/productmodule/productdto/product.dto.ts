import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
export default class ProductDto {

        @ApiProperty({
                example: 'iogute',
        })
        @IsString()
        @IsNotEmpty({ message: 'Não pode se vazio' })
        name: string;


        @ApiProperty({
                example: '2.99',
        })
        @IsString()
        @IsNotEmpty({ message: 'Não pode se vazio' })
        price: string;


        @ApiProperty({
                example: 'Iogute sabor morango 500ml',
        })
        @IsString()
        @IsNotEmpty({ message: 'Não pode se vazio' })
        description: string;


        @ApiProperty({
                example: 20,
        })
        @IsString()
        @IsNotEmpty({ message: 'Não pode se vazio' })
        estoque: string;


        @ApiProperty({
                example: 'Laticinios',
        })
        @IsString()
        @IsNotEmpty({ message: 'Não pode se vazio' })
        categoria: string;

        @ApiProperty({ type: 'string', format: 'binary' })
        file: any;

}