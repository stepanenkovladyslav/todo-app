import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class changeCompletedDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean
}
