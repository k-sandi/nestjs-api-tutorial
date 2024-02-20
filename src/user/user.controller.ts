import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(JwtGuard) // use custom guard
    @Get('me')
    getMe(@Req() req: Request) { // use Request from Express
        console.log({
            user: req.user,
        });

        return req.user
    }

}
