import { IsNotEmpty, IsString } from "class-validator";

export class ChangeDescriptionDTO {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    newDescription: string
}
