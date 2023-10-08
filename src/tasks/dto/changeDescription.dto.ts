import { IsNotEmpty, IsString } from "class-validator";

export class changeDescriptionDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  newDescription: string
}
