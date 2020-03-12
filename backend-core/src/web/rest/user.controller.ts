import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { User } from '../../domain/user.entity';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../../service/user.service';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('user-resource')
export class UserController {
  logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: User
  })
  async getAllUsers(@Req() req: Request): Promise<User[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.userService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Post('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: User
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(@Req() req: Request, @Body() user: User): Promise<User> {
    const created = await this.userService.save(user);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: User
  })
  async updateUser(@Req() req: Request, @Body() user: User): Promise<User> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', user.id);
    return await this.userService.update(user);
  }

  @Get('/:login')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User
  })
  async getUser(@Param('login') loginValue: string): Promise<User> {
    return await this.userService.find({ where: { login: loginValue } });
  }

  @Delete('/:login')
  @ApiOperation({ title: 'Delete login user' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  @Roles(RoleType.ADMIN)
  async deleteUser(@Req() req: Request, @Param('login') loginValue: string): Promise<User> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'User', loginValue);
    const userToDelete = await this.userService.find({ where: { login: loginValue } });
    return await this.userService.delete(userToDelete);
  }
}
