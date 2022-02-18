import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { EmailIsUsedException } from 'src/auth/exception/email-is-used.exception';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailUniqueGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const email: string = context.switchToHttp().getRequest().body.email
    if (!email) {
      return true;
    }
    if (!isEmail(email)) {
      throw new BadRequestException()
    }
    const user = await this.userService.findByEmail(email)
    if (!user) {
      return true
    } else {
      return false
    }
  }
}