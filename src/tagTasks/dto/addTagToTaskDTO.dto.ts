import { IsNotEmpty, IsString } from "class-validator"

export class addTagToTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly tagId: string
}
