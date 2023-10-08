import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator"

export class createTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string
  readonly description: string
  readonly file: string
  readonly date: Date
  @IsBoolean()
  readonly isCompleted: boolean
}
