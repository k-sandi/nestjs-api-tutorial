import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        // const resp = {
        //     msg: 'I have signed up'
        // }

        // Generate the password hash
        const hash = await argon.hash(dto.password)

        try {
            // Return the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            })

            delete user.hash

            // Return the saved user
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // the code for unique field
                    throw new ForbiddenException('Crendential Taken')
                }
            }
        }
    }

    async signin(dto: AuthDto) {

        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException('Credential incorrect')
        }

        // compare password
        const passMatches = await argon.verify(user.hash, dto.password)

        // if password incorrect theow exception
        if (!passMatches) {
            throw new ForbiddenException('Credential incorrect')
        }

        // send back the user
        delete user.hash // remove hash (password hashed) object from the respond
        return user;
    }
}

// const service = new AuthService()