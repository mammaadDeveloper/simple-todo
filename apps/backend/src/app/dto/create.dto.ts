import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)

  // swagger
  @ApiProperty({
    description: 'Todo title.',
    type: String,
    examples: ['Wakeup!', 'Drink water!'],
  })
  title!: string;

  @IsOptional()
  @Min(20)

  // swagger
  @ApiProperty({
    description: 'Todo description.',
  })
  description!: string;
}
