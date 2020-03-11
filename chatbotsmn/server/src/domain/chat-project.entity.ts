/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

import ChatFlow from './chat-flow.entity';

/**
 * A ChatProject.
 */
@Entity('chat_project')
export default class ChatProject extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(
    type => ChatFlow
  )
  @JoinColumn()
  flow: ChatFlow;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
