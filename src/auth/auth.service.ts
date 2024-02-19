import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
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