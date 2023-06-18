import { IsNotEmpty, IsString } from "class-validator";

export class createTagDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string
}