/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

import ChatNode from './chat-node.entity';
import ChatProject from './chat-project.entity';

/**
 * A ChatFlow.
 */
@Entity('chat_flow')
export default class ChatFlow extends BaseEntity {
  @Column({ name: 'created_on' })
  createdOn: string;

  @Column({ name: 'updated_on' })
  updatedOn: string;

  @Column({ name: 'node_locations' })
  nodeLocations: string;

  @ManyToOne(
    type => ChatNode
  )
  chatNodes: ChatNode;

  @OneToOne(
    type => ChatProject,
    other => other.flow
  )
  chatProject: ChatProject;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
