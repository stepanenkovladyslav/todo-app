import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/users/schemas/users.schema";
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { loginDTO } from "./dto/loginDTO";
import { authorizeDTO } from "./dto/authorizeDTO";

const generateJwt = (username: string, email: string, expiresIn: string = process.env.JWT_EXPIRATION) => {
  const token = jwt.sign({ username: username, email: email }, process.env.SECRET_KEY, { expiresIn: expiresIn })
  return token
}

@Injectable()

export class AuthService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }

  async createAccount(body: createAccountDTO): Promise<string> {
    try {
      let { username, email, password } = body;
      password = await bcrypt.hash(password, 10);
      const user: Users = await this.usersModel.create({ username, email, password })
      const token = generateJwt(user.username, user.email)
      return token;
    } catch (e) {
      throw new BadRequestException("This username or email is alredy taken")
    }
  }

  async login(body: loginDTO): Promise<string> {
    const { username, password } = body;
    const user = await this.usersModel.findOne({ username: username })
    if (!user) {
      throw new UnauthorizedException("Wrong username or password")
    }

    const rightPassword = await bcrypt.compare(password, user.password)
    if (!rightPassword) {
      throw new UnauthorizedException("Wrong username or password")
    }
    console.log(user.email)
    return generateJwt(username, user.email)
  }

  async authorize(headers: authorizeDTO): Promise<string> {
    try {
      const oldToken = headers.authorization.split(" ")[1];
      const user = jwt.verify(oldToken, process.env.SECRET_KEY);
      if (typeof user === "object") {
        const token = generateJwt(user.username, user.email)
        return token;
      }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
