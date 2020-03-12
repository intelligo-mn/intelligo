import { Controller, Get, Logger, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('auth-controller')
export class AuthController {
  logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @Get('/authorities')
  @ApiOperation({ title: 'Get the list of user roles' })
  @ApiResponse({
    status: 200,
    description: 'List all user roles',
    type: 'string',
    isArray: true
  })
  @Roles(RoleType.ADMIN)
  getAuthorities(@Req() req: any): any {
    const user: User = req.user;
    return user.authorities;
  }
}
