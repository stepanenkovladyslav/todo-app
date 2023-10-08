import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class changeTitleDTO {
  @IsString()
  @IsNotEmpty()
  newTitle: string
}
