import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema, UpdateUserDto, UpdateUserSchema, UserRoleDto } from './dto/user.dto';
import { DbService } from 'src/db/db.service';
import { hashPassword } from 'src/common/utils/hash.util';
import { generateUsername } from 'src/common/utils/characters.util';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) { }

  async create(createUserDto: CreateUserDto) {
    const validate = CreateUserSchema.safeParse(createUserDto);
    if (!validate.success) throw new NotFoundException('Invalid data to create user ')
    const { email, name, password } = validate.data;
    try {
      const user = await this.dbService.user.findUnique({
        where: { email }
      });
      if (user) throw new NotFoundException(`User email ready exits [${email}], try other email`);
      let hash_password: undefined | string = undefined
      if (password) {
        hash_password = await hashPassword(password)
      }
      return await this.dbService.user.create({
        data: {
          email, name, password: hash_password, username: generateUsername(name)
        }
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new NotFoundException('User already exists');
      }
      throw error;
    }
  }

  async findAll(role?: UserRoleDto) {
    try {
      if (role) return await this.dbService.user.findMany({ where: { role } })
      return this.dbService.user.findMany();
    } catch (error) {
      throw new NotFoundException({ error, message: "Some thing went wrong to get all users" })
    }
  }

  async findOne(id?: string, email?: string, username?: string) {
    if (!id && !email && !username) {
      throw new NotFoundException('User not found');
    }
    try {
      const where = id ? { id } : email ? { email } : { username };

      const user = await this.dbService.user.findUnique({ where });

      if (!user) {
        throw new NotFoundException(`User not found by [${where.email ? where.id : where.username}]`);
      }
      return user;
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    const validate = UpdateUserSchema.safeParse(updateUserDto);
    if (!validate.success) throw new NotFoundException('valid data to update user ')
    const {name , role , email ,username, password} = validate.data;
    try {
      if (email) {
        const user = await this.dbService.user.findUnique({where : {email}});
        if (user) throw new NotFoundException(`User email is ready exit [${email}], try other email`)
      }
      if (username) {
        const user = await this.dbService.user.findUnique({where : {username}});
        if (user) throw new NotFoundException(`User username is ready exit [${username}], try other username`)
      }
      let hash_password: undefined | string = undefined
      if (password) {
        hash_password = await hashPassword(password)
      }
      return await this.dbService.user.update({where :{id}, data :{password : hash_password, ...updateUserDto}})
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
