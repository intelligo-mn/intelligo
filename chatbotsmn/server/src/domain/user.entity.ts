import { Authority } from './authority.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('jhi_user')
export class User extends BaseEntity {
  @ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
  @Column({ unique: true })
  login: string;
  @ApiModelProperty({ example: 'MyUser', description: 'User first name' })
  @Column()
  firstName: string;
  @ApiModelProperty({ example: 'MyUser', description: 'User last name' })
  @Column()
  lastName: string;
  @ApiModelProperty({ example: 'myuser@localhost', description: 'User email' })
  @Column({ nullable: true })
  email?: string;
  @ApiModelProperty({ example: 'true', description: 'User activation' })
  @Column()
  activated: boolean;
  @ApiModelProperty({ example: 'en', description: 'User language' })
  @Column()
  langKey: string;

  // eslint-disable-next-line
  @ManyToMany(type => Authority)
  @JoinTable()
  @ApiModelProperty({ isArray: true, enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'], description: 'Array of permissions' })
  authorities?: any[];

  @ApiModelProperty({ example: 'myuser', description: 'User password' })
  @Column()
  password: string;
  @Column({ nullable: true })
  imageUrl?: string;
  @Column({ nullable: true })
  activationKey?: string;
  @Column({ nullable: true })
  resetKey?: string;
  @Column({ nullable: true })
  resetDate?: Date;
}
