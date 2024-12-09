import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  createTask(title: string, description: string, priority: string): Promise<Task> {
    const newTask = this.taskRepository.create({ title, description, priority });
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, status: string): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return this.taskRepository.save(task);
  }

  async updateTaskPriority(id: number, priority: string): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.priority = priority;
    return this.taskRepository.save(task);
  }

  deleteTask(id: number): Promise<void> {
    return this.taskRepository.delete(id).then(() => {});
  }
}

