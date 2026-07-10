import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto } from './dto/create.dto';
import { UpdateTodoDto } from './dto/update.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)

  // swagger
  @ApiOkResponse({ description: 'Fetch all todos.' })
  all() {
    return this.appService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)

  // swagger
  @ApiCreatedResponse({ description: 'Create new todo.' })
  async create(@Body() body: CreateTodoDto) {
    return await this.appService.create(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)

  // swagger
  @ApiNoContentResponse({ description: 'Update todo.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto,
  ) {
    await this.appService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)

  // swagger
  @ApiNoContentResponse({ description: 'Delete todo.' })
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.appService.delete(id);
  }
}
