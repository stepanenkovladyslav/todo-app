import { IsNotEmpty, IsString } from "class-validator"

export class createAccountDTO {
    @IsString()
    @IsNotEmpty()
    readonly username: string
    @IsString()
    @IsNotEmpty()
    readonly email: string
    @IsString()
    @IsNotEmpty()
    readonly password: string
}