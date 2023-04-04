import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
export default class ProductDto {

        @ApiProperty({
                example:""
        })
        @IsString()
        @IsNotEmpty({message: 'Categoria nao pode ser vazio'})
        catId:string;


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
        stock: string;


        @ApiProperty({ type: 'string', format: 'binary' })
        file: any;

}