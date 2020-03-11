import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../service/dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { Authority } from '../domain/authority.entity';
import { User } from '../domain/user.entity';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
    private userService: UserService
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;

    const userFind = await this.userService.findByfields({ where: { username: loginUserName, password: loginPassword } });
    if (!userFind) {
      throw new HttpException('Invalid login name or password.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findUserWithAuthById(userFind.id);

    const payload: Payload = { id: user.id, username: user.login, authorities: user.authorities };

    /* eslint-disable */
    return {
      id_token: this.jwtService.sign(payload)
    };
  }

  /* eslint-enable */
  async validateUser(payload: Payload): Promise<User | undefined> {
    return await this.findUserWithAuthById(payload.id);
  }

  async find(): Promise<Authority[]> {
    return await this.authorityRepository.find();
  }

  async findUserWithAuthById(userId: string): Promise<User | undefined> {
    const user: any = await this.userService.findByfields({ where: { id: userId } });
    return user;
  }
}
