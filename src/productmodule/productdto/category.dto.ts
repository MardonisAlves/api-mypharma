import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CategoryDto{

    @ApiProperty({example:'Laticinios'})
    @IsString()
    @IsNotEmpty({message:'Categoria nao pode ser vazia'})
    category:string;
}