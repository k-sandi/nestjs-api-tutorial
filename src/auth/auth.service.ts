import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService) {}

    signup() {
        const resp = {
            msg: 'I have signed up'
        }

        return resp
    }

    signin() {
        const resp = {
            msg: 'I have signin in'
        }

        return resp
    }
}

// const service = new AuthService()