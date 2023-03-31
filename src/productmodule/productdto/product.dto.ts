import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class ProductDto{

        @IsString()
        @IsNotEmpty({message:'Nã0 pode se vazio'})
        name:string;

        @IsString()
        @IsNotEmpty({message:'Nã0 pode se vazio'})
        price:string;

        @IsString()
        @IsNotEmpty({message:'Nã0 pode se vazio'})
        description:string;

        @IsNumber()
        @IsNotEmpty({message:'Nã0 pode se vazio'})
        estoque: number;

        @IsString()
        @IsNotEmpty({message:'Nã0 pode se vazio'})
        categoria:string;
      
}