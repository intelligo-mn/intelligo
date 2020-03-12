import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Button from '../../domain/button.entity';
import { ButtonService } from '../../service/button.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/buttons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('buttons')
export class ButtonController {
  logger = new Logger('ButtonController');

  constructor(private readonly buttonService: ButtonService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Button
  })
  async getAll(@Req() req: Request): Promise<Button[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.buttonService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Button
  })
  async getOne(@Param('id') id: string): Promise<Button> {
    return await this.buttonService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create button' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Button
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() button: Button): Promise<Button> {
    const created = await this.buttonService.save(button);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Button', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update button' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Button
  })
  async put(@Req() req: Request, @Body() button: Button): Promise<Button> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Button', button.id);
    return await this.buttonService.update(button);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete button' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Button> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Button', id);
    const toDelete = await this.buttonService.findById(id);
    return await this.buttonService.delete(toDelete);
  }
}
