import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ChatProject from '../../domain/chat-project.entity';
import { ChatProjectService } from '../../service/chat-project.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/chat-projects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('chat-projects')
export class ChatProjectController {
  logger = new Logger('ChatProjectController');

  constructor(private readonly chatProjectService: ChatProjectService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChatProject
  })
  async getAll(@Req() req: Request): Promise<ChatProject[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.chatProjectService.findAndCount({
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
    type: ChatProject
  })
  async getOne(@Param('id') id: string): Promise<ChatProject> {
    return await this.chatProjectService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create chatProject' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChatProject
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() chatProject: ChatProject): Promise<ChatProject> {
    const created = await this.chatProjectService.save(chatProject);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatProject', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update chatProject' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChatProject
  })
  async put(@Req() req: Request, @Body() chatProject: ChatProject): Promise<ChatProject> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatProject', chatProject.id);
    return await this.chatProjectService.update(chatProject);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete chatProject' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ChatProject> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChatProject', id);
    const toDelete = await this.chatProjectService.findById(id);
    return await this.chatProjectService.delete(toDelete);
  }
}
