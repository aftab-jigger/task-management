import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepo: UsersRepository,
  ) {}

  async signUp(authCredentials: AuthCredentialsDTO): Promise<any> {
    return this.userRepo.createUser(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.userRepo.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Success';
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
