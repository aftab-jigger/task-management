import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  search?: string;
}
