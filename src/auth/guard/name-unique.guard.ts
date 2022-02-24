import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { NameIsUsedException } from '../exception/name-is-used.exception';

@Injectable()
export class NameUniqueGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const name: string = context.switchToHttp().getRequest().body.name
    console.log()
    if (!name) {
      return true
    }
    const user = await this.userService.findByName(name)
    if (!user) {
      return true
    } else {
      throw new NameIsUsedException()
    }
  }
}
