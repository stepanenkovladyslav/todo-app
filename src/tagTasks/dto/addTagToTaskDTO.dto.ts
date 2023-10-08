import { IsNotEmpty, IsString } from "class-validator"

export class addTagToTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly id: string
  @IsString()
  @IsNotEmpty()
  readonly tagId: string
}
