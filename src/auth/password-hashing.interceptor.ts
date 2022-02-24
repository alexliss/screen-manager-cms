import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as argon2 from "argon2";
import { isString, maxLength, minLength } from 'class-validator';

@Injectable()
export class PasswordHashingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    let password = context.switchToHttp().getRequest().body.password
    if(!password) {
      throw new BadRequestException('password is undefined')
    }
    const isPasswordCorrect = isString(password) && minLength(password, 8) && maxLength(password, 16)
    if(!isPasswordCorrect) {
      throw new BadRequestException('password must be string 8 to 16 symbols')
    }
    password = await argon2.hash(password)
    context.switchToHttp().getRequest().body.password = password
    return next.handle();
  }
}
