import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ChatFlow from '../../domain/chat-flow.entity';
import { ChatFlowService } from '../../service/chat-flow.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/chat-flows')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('chat-flows')
export class ChatFlowController {
  logger = new Logger('ChatFlowController');

  constructor(private readonly chatFlowService: ChatFlowService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChatFlow
  })
  async getAll(@Req() req: Request): Promise<ChatFlow[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.chatFlowService.findAndCount({
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
    type: ChatFlow
  })
  async getOne(@Param('id') id: string): Promise<ChatFlow> {
    return await this.chatFlowService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create chatFlow' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChatFlow
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() chatFlow: ChatFlow): Promise<ChatFlow> {
    const created = await this.chatFlowService.save(chatFlow);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatFlow', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update chatFlow' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChatFlow
  })
  async put(@Req() req: Request, @Body() chatFlow: ChatFlow): Promise<ChatFlow> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatFlow', chatFlow.id);
    return await this.chatFlowService.update(chatFlow);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete chatFlow' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ChatFlow> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChatFlow', id);
    const toDelete = await this.chatFlowService.findById(id);
    return await this.chatFlowService.delete(toDelete);
  }
}
