import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { RegisterDtoRequest } from 'src/auth/dto/register.dto.request';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('user-token')
@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: [RegisterDtoRequest]
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase', 'replaceOneBase']
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
export class UserController {
  constructor(public service: UserService) { }
}
