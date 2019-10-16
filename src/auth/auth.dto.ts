import { Address } from '../types/user';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiModelProperty({ example: 'admin', description: 'The username of acount' })
  username: string;
  @ApiModelProperty({
    example: 'password',
    description: 'The password of acount',
  })
  password: string;
}

export class RegisterDTO {
  @ApiModelProperty({ example: 'admin', description: 'The username of acount' })
  username: string;

  @ApiModelProperty({ example: 'admin', description: 'The username of acount' })
  password: string;

  seller?: boolean;
  address?: Address;
}
