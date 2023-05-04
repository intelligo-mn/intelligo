/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Section from './section.entity';
import Button from './button.entity';
import ChatFlow from './chat-flow.entity';
import { APIMethod } from './enumeration/api-method';

/**
 * A ChatNode.
 */
@Entity('chat_node')
export default class ChatNode extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'emotion' })
  emotion: string;

  @Column({ name: 'chat_node_type' })
  chatNodeType: string;

  @Column({ name: 'variable_name' })
  variableName: string;

  @Column({ type: 'enum', name: 'api_method', enum: APIMethod })
  apiMethod: APIMethod;

  @Column({ name: 'api_url' })
  apiUrl: string;

  @Column({ name: 'api_response_data_root' })
  apiResponseDataRoot: string;

  @Column({ name: 'next_node_id' })
  nextNodeId: string;

  @Column({ name: 'required_variables' })
  requiredVariables: string;

  @Column({ name: 'group_name' })
  groupName: string;

  @Column({ name: 'card_header' })
  cardHeader: string;

  @Column({ name: 'card_footer' })
  cardFooter: string;

  @Column({ type: 'boolean', name: 'is_start_node' })
  isStartNode: boolean;

  @Column({ type: 'boolean', name: 'is_goal_node' })
  isGoalNode: boolean;

  @Column({ name: 'target_bot_id' })
  targetBotId: string;

  @Column({ name: 'target_node_id' })
  targetNodeId: string;

  @OneToMany(
    type => Section,
    other => other.chatNode
  )
  sections: Section[];

  @OneToMany(
    type => Button,
    other => other.chatNode
  )
  buttons: Button[];

  @ManyToOne(
    type => ChatFlow,
    other => other.chatNodes
  )
  chatFlow: ChatFlow;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
