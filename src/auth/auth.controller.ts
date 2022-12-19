import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDTO): Promise<any> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentials: AuthCredentialsDTO,
  ): Promise<{ message: string; accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }
}
