import { IsNotEmpty, IsString, isString } from "class-validator"

export class changeTagNameDTO {
  @IsString()
  @IsNotEmpty()
  readonly newName: string
}
