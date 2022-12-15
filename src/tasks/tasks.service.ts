import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepo: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepo.getTasks(filterDto);
  }

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepo.createTask(createTaskDTO);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepo.findOne(id);
    if (!task) {
      throw new NotFoundException({ status: 404, message: 'Task not Found' });
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<any> {
    const result = await this.tasksRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task not found of id ${id}`);
    }
    return { message: 'Task deleted successfuly' };
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepo.save(task);
    return task;
  }
}
