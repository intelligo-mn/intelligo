import { Address } from '../types/user';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'admin', description: 'The username of acount' })
  username: string;
  @ApiProperty({
    example: 'password',
    description: 'The password of acount',
  })
  password: string;
}

export class RegisterDTO {
  @ApiProperty({ example: 'admin', description: 'The username of acount' })
  username: string;

  @ApiProperty({ example: 'admin', description: 'The username of acount' })
  password: string;

  seller?: boolean;
  address?: Address;
}
