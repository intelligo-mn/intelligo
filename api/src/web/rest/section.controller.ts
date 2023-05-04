import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Section from '../../domain/section.entity';
import { SectionService } from '../../service/section.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sections')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('sections')
export class SectionController {
  logger = new Logger('SectionController');

  constructor(private readonly sectionService: SectionService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Section
  })
  async getAll(@Req() req: Request): Promise<Section[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.sectionService.findAndCount({
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
    type: Section
  })
  async getOne(@Param('id') id: string): Promise<Section> {
    return await this.sectionService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create section' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Section
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() section: Section): Promise<Section> {
    const created = await this.sectionService.save(section);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Section', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update section' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Section
  })
  async put(@Req() req: Request, @Body() section: Section): Promise<Section> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Section', section.id);
    return await this.sectionService.update(section);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete section' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Section> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Section', id);
    const toDelete = await this.sectionService.findById(id);
    return await this.sectionService.delete(toDelete);
  }
}
