import { IsNotEmpty, IsString, isNotEmpty, isString } from "class-validator"

export class loginDTO {
    @IsString()
    @IsNotEmpty()    
    readonly username: string
    @IsString()
    @IsNotEmpty()
    readonly password: string
}