import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
}
