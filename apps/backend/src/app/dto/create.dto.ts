import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  title!: string;

  @IsOptional()
  @Min(20)
  description!: string;
}
