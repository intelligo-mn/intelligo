import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDTO {
  @ApiModelProperty({ description: 'User password', required: true })
  @IsString()
  readonly password: string;

  @ApiModelProperty({ description: 'User remember login', required: false })
  readonly rememberMe: boolean;

  @ApiModelProperty({ description: 'User login name', required: true })
  @IsString()
  readonly username: string;
}
