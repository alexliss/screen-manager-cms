import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserProperty } from './user-property';

export class UserPropertyGuard implements CanActivate {
  constructor(readonly type: Type<UserProperty>) {}
  async canActivate(context: ExecutionContext) {
    const propertyId = context.switchToHttp().getRequest().params.id
    const userId = context.switchToHttp().getRequest().user.id
    const property: UserProperty = await getRepository(this.type).findOneOrFail(propertyId)
    if (property.userId === userId) {
      return true
    }
    return false
  }
}
