import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Delete, Get, Patch, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PasswordHashingInterceptor } from 'src/auth/password-hashing.interceptor';
import { User } from 'src/auth/user.decorator';
import { UserUpdateDtoRequest } from './dto/user-update.dto.request';
import { EmailUniqueGuard } from './guard/email-unique.guard';
import { NameUniqueGuard } from './guard/name-unique.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('user-token')
@ApiException(() => UnauthorizedException)
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase', 'replaceOneBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: {
      interceptors: [],
      decorators: [],
    }
  }
}
)
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => ({
    id: user.id
  })
})
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) { }

  @ApiOkResponse({type: UserEntity})
  @ApiException(() => UnauthorizedException)
  @Get('me')
  async getByPayload(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @UseGuards(EmailUniqueGuard, NameUniqueGuard)
  @UseInterceptors(PasswordHashingInterceptor)
  @ApiOkResponse({type: UserEntity})
  @ApiException(() => UnauthorizedException)
  @Patch()
  async update(
    @User() user: UserEntity, 
    @Body() newData: UserUpdateDtoRequest) {
    return this.service.update(user, newData)
  }

  @ApiNoContentResponse()
  @ApiException(() => UnauthorizedException)
  @Delete()
  async delete(@User() user: UserEntity) {
    this.service.delete(user)
  }
}
