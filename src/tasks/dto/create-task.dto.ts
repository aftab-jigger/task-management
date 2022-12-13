import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty({ message: 'You must have to fill title' })
  title: string;

  @IsNotEmpty()
  description: string;
}
