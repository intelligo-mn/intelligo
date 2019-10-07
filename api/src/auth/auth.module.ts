import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule {}
