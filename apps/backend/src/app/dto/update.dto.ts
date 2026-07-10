import { IsBoolean } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create.dto';

export class AdditionalUpdateDto {
  @IsBoolean()
  isDone!: boolean;
}

export class UpdateTodoDto extends IntersectionType(
  CreateTodoDto,
  AdditionalUpdateDto,
) {}
