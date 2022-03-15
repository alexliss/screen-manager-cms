import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPropertyGuard } from 'src/user-property.guard';
import { EventRequestDto } from './dto/event-request.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';

@ApiTags('event')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('user-token')
@Crud({
    model: {
        type: EventEntity
    },
    dto: {
        create: EventRequestDto,
        update: EventRequestDto
    },
    serialize: {
        create: EventResponseDto,
        get: EventResponseDto,
        update: EventResponseDto
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    },
    routes: {
        exclude: ['replaceOneBase', 'recoverOneBase', 'createManyBase'],
        'updateOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(EventEntity))]
        },
        'deleteOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(EventEntity))]
        }
    }
})
@CrudAuth({
    property: 'user',
    persist: (user) => ({
        userId: user.id,
      }),
})
@Controller('event')
export class EventController implements CrudController<EventEntity> {
    constructor(public service: EventService) { }
}
