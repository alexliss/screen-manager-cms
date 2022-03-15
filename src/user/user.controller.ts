import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserResponseDto } from './dto/user-response.dto';
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

}
