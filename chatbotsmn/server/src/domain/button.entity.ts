/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A Button.
 */
@Entity('button')
export default class Button extends BaseEntity {
  @Column({ name: 'button_name' })
  buttonName: string;

  @Column({ name: 'button_text' })
  buttonText: string;

  @Column({ type: 'integer', name: 'emotion' })
  emotion: number;

  @Column({ name: 'button_type' })
  buttonType: string;

  @Column({ name: 'deep_link_url' })
  deepLinkUrl: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'items_source' })
  itemsSource: string;

  @Column({ type: 'boolean', name: 'allow_multiple' })
  allowMultiple: boolean;

  @Column({ type: 'integer', name: 'bounce_timeout' })
  bounceTimeout: number;

  @Column({ name: 'next_node_id' })
  nextNodeId: string;

  @Column({ type: 'boolean', name: 'default_button' })
  defaultButton: boolean;

  @Column({ type: 'boolean', name: 'hidden' })
  hidden: boolean;

  @Column({ name: 'variable_value' })
  variableValue: string;

  @Column({ name: 'prefix_text' })
  prefixText: string;

  @Column({ name: 'postfix_text' })
  postfixText: string;

  @Column({ name: 'placeholder_text' })
  placeholderText: string;

  @Column({ name: 'condition_match_key' })
  conditionMatchKey: string;

  @Column({ name: 'condition_operator' })
  conditionOperator: string;

  @Column({ name: 'condition_match_value' })
  conditionMatchValue: string;

  @Column({ type: 'boolean', name: 'post_to_chat' })
  postToChat: boolean;

  @Column({ type: 'boolean', name: 'does_repeat' })
  doesRepeat: boolean;

  @Column({ name: 'repeat_on' })
  repeatOn: string;

  @Column({ name: 'repeat_as' })
  repeatAs: string;

  @Column({ type: 'integer', name: 'start_position' })
  startPosition: number;

  @Column({ type: 'integer', name: 'max_repeats' })
  maxRepeats: number;

  @Column({ type: 'boolean', name: 'advanced_options' })
  advancedOptions: boolean;

  @Column({ type: 'integer', name: 'min_length' })
  minLength: number;

  @Column({ type: 'integer', name: 'max_length' })
  maxLength: number;

  @Column({ name: 'default_text' })
  defaultText: string;

  @Column({ type: 'boolean', name: 'is_multi_line' })
  isMultiLine: boolean;

  @Column({ name: 'content_id' })
  contentId: string;

  @Column({ name: 'content_emotion' })
  contentEmotion: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
