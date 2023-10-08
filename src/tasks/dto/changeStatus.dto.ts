import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class changeStatusDTO{
  @IsBoolean()
  @IsNotEmpty()
  newStatus: boolean
}
