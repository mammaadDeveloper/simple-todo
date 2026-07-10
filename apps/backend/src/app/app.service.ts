import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';
import { CreateTodoDto } from './dto/create.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repo: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.repo.find();
  }

  async create(data: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.repo.create(data);
    return await this.repo.save(todo);
  }

  async update(
    id: number,
    data: DeepPartial<TodoEntity>,
  ): Promise<UpdateResult> {
    return await this.repo.update({ id }, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete({ id });
  }
}
