import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class ChangeDeadlineDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsDateString()
  @IsNotEmpty()
  newDeadline: Date
}
