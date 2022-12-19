import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Not Valid Status' })
  status?: TaskStatus;

  @IsOptional()
  search?: string;
}
