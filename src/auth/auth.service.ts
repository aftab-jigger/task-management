import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDTO): Promise<any> {
    return this.userRepo.createUser(authCredentials);
  }

  async signIn(
    authCredentials: AuthCredentialsDTO,
  ): Promise<{ message: string; accessToken: string }> {
    const { username, password } = authCredentials;
    const user = await this.userRepo.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { message: 'Successfully Signed in', accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
