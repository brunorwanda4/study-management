import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema, UpdateUserDto, UpdateUserSchema, UserRoleDto } from './dto/user.dto';
import { DbService } from 'src/db/db.service';
import { hashPassword } from 'src/common/utils/hash.util';
import { generateUsername } from 'src/common/utils/characters.util';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const validation = CreateUserSchema.safeParse(createUserDto);
    if (!validation.success) {
      throw new BadRequestException('Invalid user data provided');
    }

    const { email, name, password } = validation.data;

    try {
      const existingUser = await this.dbService.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new BadRequestException({error :`Email [${email}] is already in use`, statusCode : 400});
      }

      const hashedPassword = password ? await hashPassword(password) : undefined;

      return await this.dbService.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          username: generateUsername(name),
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user', error?.message);
    }
  }

  async findAll(role?: UserRoleDto) {
    try {
      const where = role ? { role } : undefined;
      return await this.dbService.user.findMany({ where });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users', error?.message);
    }
  }

  async findOne(id?: string, email?: string, username?: string) {
    if (!id && !email && !username) {
      throw new BadRequestException('You must provide id, email or username to find a user');
    }

    const where = id ? { id } : email ? { email } : { username };

    try {
      const user = await this.dbService.user.findUnique({ where });

      if (!user) {
        const identifier = id || email || username;
        throw new NotFoundException(`User not found with identifier: "${identifier}"`);
      }

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Error fetching user', error?.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const validation = UpdateUserSchema.safeParse(updateUserDto);
    if (!validation.success) {
      throw new BadRequestException('Invalid user update data');
    }

    const { email, username, password, ...rest } = validation.data;

    try {
      const [emailExists, usernameExists] = await Promise.all([
        email ? this.dbService.user.findUnique({ where: { email } }) : null,
        username ? this.dbService.user.findUnique({ where: { username } }) : null,
      ]);

      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException(`Email [${email}] is already in use`);
      }

      if (usernameExists && usernameExists.id !== id) {
        throw new BadRequestException(`Username [${username}] is already in use`);
      }

      const hashedPassword = password ? await hashPassword(password) : undefined;

      return await this.dbService.user.update({
        where: { id },
        data: {
          ...rest,
          email,
          username,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Failed to update user', error?.message);
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.user.delete({ where: { id } });
      return { message: `User with ID "${id}" has been removed successfully.` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      throw new InternalServerErrorException('Failed to delete user', error?.message);
    }
  }
}
