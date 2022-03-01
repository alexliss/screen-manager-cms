import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Delete, Get, Patch, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { EmailUniqueGuard } from 'src/auth/guard/email-unique.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NameUniqueGuard } from 'src/auth/guard/name-unique.guard';
import { PasswordHashingInterceptor } from 'src/auth/password-hashing.interceptor';
import { User } from 'src/auth/user.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
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
  dto: {},
  serialize: {
    'get': UserResponseDto
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
@CrudAuth({
  property: 'user',
  persist: (user: UserEntity) => ({
    id: user.id
  })
})
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) { }

  @ApiOkResponse({type: UserEntity})
  @ApiException(() => UnauthorizedException)
  @ApiOkResponse({type: UserResponseDto})
  @Get('me')
  getByPayload(@User() user: UserEntity): UserResponseDto {
    return new UserResponseDto(user);
  }

  @UseGuards(EmailUniqueGuard, NameUniqueGuard)
  @UseInterceptors(PasswordHashingInterceptor)
  @ApiOkResponse({type: UserResponseDto})
  @ApiException(() => UnauthorizedException)
  @Patch()
  async update(
    @User() user: UserEntity, 
    @Body() newData: UserRequestDto): Promise<UserResponseDto> {
    return this.service.update(user, newData)
  }

  @ApiNoContentResponse()
  @ApiException(() => UnauthorizedException)
  @Delete()
  async delete(@User() user: UserEntity) {
    this.service.delete(user)
  }
}
