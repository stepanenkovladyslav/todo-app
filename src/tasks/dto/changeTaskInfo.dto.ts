import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class changeTitleDTO {
  @IsString()
  @IsNotEmpty()
  id: string
  @IsString()
  @IsNotEmpty()
  newTitle: string
}
