import { IsNotEmpty, IsString } from "class-validator";

export class changeDescriptionDTO {
  @IsString()
  @IsNotEmpty()
  newDescription: string
}
