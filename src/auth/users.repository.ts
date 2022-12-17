import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  // Create User
  async createUser(userCredentails: AuthCredentialsDTO): Promise<any> {
    const { username, password } = userCredentails;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate Code Error 23505 but it's a string. Code is string not a number
        throw new ConflictException('Username Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return { message: 'User created Successfully' };
  }
}
