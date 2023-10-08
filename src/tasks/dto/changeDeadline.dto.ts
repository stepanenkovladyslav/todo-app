import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class changeDeadlineDTO {
  @IsDateString()
  @IsNotEmpty()
  newDeadline: Date
}
