import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthUserDto, LoginUserDto, LoginUserSchema } from 'src/user/dto/user.dto';
import { verifyPassword } from 'src/common/utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }
  
  async authenticate(input: LoginUserDto): Promise<AuthUserDto> {
    const user = await this.validateUser(input);
    if (!user) throw new UnauthorizedException(" Invalid credentials");
    return this.signIn(user)

  }

  async validateUser(user: LoginUserDto) {
    const validate = LoginUserSchema.safeParse(user);
    if (!validate.success) return null;
    const user_data = await this.userService.findOne(undefined, user.email);
    if (!user) return null;
    if (!user_data.password) return null;
    const verify_password = await verifyPassword(user.password, user_data.password);
    if (!verify_password) return null
    return user_data;
  }

  async signIn(user: User): Promise<AuthUserDto> {
    const tokenPayload:AuthUserDto = {
      id: user.id, name: user.name, email: user.email, role: user.role ?? undefined
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload)

    return { id: user.id, accessToken, name: user.name, email: user.email, role: user.role ?? undefined }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
