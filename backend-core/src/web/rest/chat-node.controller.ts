import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ChatNode from '../../domain/chat-node.entity';
import { ChatNodeService } from '../../service/chat-node.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/chat-nodes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('chat-nodes')
export class ChatNodeController {
  logger = new Logger('ChatNodeController');

  constructor(private readonly chatNodeService: ChatNodeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChatNode
  })
  async getAll(@Req() req: Request): Promise<ChatNode[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.chatNodeService.findAndCount({
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
    type: ChatNode
  })
  async getOne(@Param('id') id: string): Promise<ChatNode> {
    return await this.chatNodeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create chatNode' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChatNode
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() chatNode: ChatNode): Promise<ChatNode> {
    const created = await this.chatNodeService.save(chatNode);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatNode', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update chatNode' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChatNode
  })
  async put(@Req() req: Request, @Body() chatNode: ChatNode): Promise<ChatNode> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChatNode', chatNode.id);
    return await this.chatNodeService.update(chatNode);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete chatNode' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ChatNode> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChatNode', id);
    const toDelete = await this.chatNodeService.findById(id);
    return await this.chatNodeService.delete(toDelete);
  }
}
