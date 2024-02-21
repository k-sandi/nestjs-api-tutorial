import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { GetUser } from 'src/auth/decorator';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard) // use custom guard
@Controller('user')
export class UserController {

    @Get('me')
    getMe(
        @GetUser() user: User
    ) {
        return user
    }

    @Patch('me')
    editUser() { }

}
