import { Body, Controller, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { loginDTO } from "./dto/loginDTO";
import { authorizeDTO } from "./dto/authorizeDTO";

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('create')
    async createAccount(@Body() body: createAccountDTO ) {
        return this.authService.createAccount(body)
    }
    
    @Post('login')
    async login(@Body() body: loginDTO) {
        return this.authService.login(body)
    }

    @Post('authorize')
    async authorize(@Headers() headers: authorizeDTO) {
        return this.authService.authorize(headers)
    }
}