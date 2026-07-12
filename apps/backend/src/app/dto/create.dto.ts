import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)

  // swagger
  @ApiProperty({
    description: 'Todo title.',
    type: String,
    examples: ['Wakeup!', 'Drink water!'],
  })
  title!: string;

  @IsOptional()
  @MinLength(20)

  // swagger
  @ApiProperty({
    description: 'Todo description.',
  })
  description!: string;
}
