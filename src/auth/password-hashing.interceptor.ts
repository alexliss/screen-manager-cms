import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as argon2 from "argon2";

@Injectable()
export class PasswordHashingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    let password = context.switchToHttp().getRequest().body.password
    if (password) {
      password = await argon2.hash(password)
      context.switchToHttp().getRequest().body.password = password
    }
    return next.handle();
  }
}
