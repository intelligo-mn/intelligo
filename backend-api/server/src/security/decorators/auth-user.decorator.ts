import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, request) => request.user);
