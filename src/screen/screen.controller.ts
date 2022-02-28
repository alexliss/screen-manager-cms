import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserPropertyGuard } from 'src/user-property.guard';
import { ScreenRequestDto } from './dto/screen-request.dto';
import { ScreenResponseDto } from './dto/screen-response.dto';
import { ScreenEntity } from './screen.entity';
import { ScreenService } from './screen.service';

@ApiTags('screen')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('user-token')
@Crud({
    model: {
        type: ScreenEntity
    },
    dto: {
        create: ScreenRequestDto,
        update: ScreenRequestDto
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    },
    serialize: {
        create: ScreenResponseDto,
        update: ScreenResponseDto,
        get: ScreenResponseDto
    },
    routes: {
        exclude: ['replaceOneBase', 'recoverOneBase', 'createManyBase'],
        'updateOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(ScreenEntity))]
        },
        'deleteOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(ScreenEntity))]
        }
    }
})
@CrudAuth({
    property: 'user',
    persist: (user) => ({
        userId: user.id
    })
})
@Controller('screen')
export class ScreenController {
    constructor(public service: ScreenService) {}
}
