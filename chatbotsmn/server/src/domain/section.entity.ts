/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A Section.
 */
@Entity('section')
export default class Section extends BaseEntity {
  @Column({ name: 'section_type' })
  sectionType: string;

  @Column({ type: 'integer', name: 'delay_in_ms' })
  delayInMs: number;

  @Column({ type: 'boolean', name: 'hidden' })
  hidden: boolean;

  @Column({ name: 'content_id' })
  contentId: string;

  @Column({ name: 'content_emotion' })
  contentEmotion: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
