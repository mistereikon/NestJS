import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: string,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description, priority);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }

  @Patch(':id/priority')
  updateTaskPriority(
    @Param('id') id: number,
    @Body('priority') priority: string,
  ): Promise<Task> {
    return this.tasksService.updateTaskPriority(id, priority);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

