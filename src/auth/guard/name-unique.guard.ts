import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NameUniqueGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const name: string = context.switchToHttp().getRequest().body.name
    if (!name) {
      throw new BadRequestException()
    }
    const user = await this.userService.findByName(name)
    if (!user) {
      return true
    } else {
      return false
    }
  }
}
