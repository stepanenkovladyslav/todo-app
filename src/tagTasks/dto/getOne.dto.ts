import { IsNotEmpty, IsString } from "class-validator";

export class getOneTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly id: string
}
