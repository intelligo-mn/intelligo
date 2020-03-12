import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { UserRepository } from '../repository/user.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async findById(id: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne(id);
    return this.flatAuthorities(result);
  }

  async findByfields(options: FindOneOptions<User>): Promise<User | undefined> {
    options.relations = ['authorities'];
    const result = await this.userRepository.findOne(options);
    return this.flatAuthorities(result);
  }

  async find(options: FindManyOptions<User>): Promise<User | undefined> {
    const result = await this.userRepository.findOne(options);
    return this.flatAuthorities(result);
  }

  async findAndCount(options: FindManyOptions<User>): Promise<[User[], number]> {
    options.relations = ['authorities'];
    const resultList = await this.userRepository.findAndCount(options);
    const users: User[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(user => users.push(this.flatAuthorities(user)));
      resultList[0] = users;
    }
    return resultList;
  }

  async save(user: User): Promise<User | undefined> {
    user = this.convertInAuthorities(user);
    const result = await this.userRepository.save(user);
    return this.flatAuthorities(result);
  }

  async update(user: User): Promise<User | undefined> {
    return await this.save(user);
  }

  async delete(user: User): Promise<User | undefined> {
    return await this.userRepository.remove(user);
  }

  private flatAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach(authority => authorities.push(authority.name));
      user.authorities = authorities;
    }
    return user;
  }

  private convertInAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach(authority => authorities.push({ name: authority }));
      user.authorities = authorities;
    }
    return user;
  }
}
