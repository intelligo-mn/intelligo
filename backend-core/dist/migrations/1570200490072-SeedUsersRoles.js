"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../domain/user.entity");
const authority_entity_1 = require("../domain/authority.entity");
class SeedUsersRoles1570200490072 {
    constructor() {
        this.role1 = { name: 'ROLE_ADMIN' };
        this.role2 = { name: 'ROLE_USER' };
        this.user1 = {
            login: 'system',
            password: 'system',
            firstName: 'System',
            lastName: 'System',
            email: 'system@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: 'system',
            lastModifiedBy: 'system'
        };
        this.user2 = {
            login: 'anonymoususer',
            password: 'anonymoususer',
            firstName: 'Anonymous',
            lastName: 'User',
            email: 'anonymoususer@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: 'system',
            lastModifiedBy: 'system'
        };
        this.user3 = {
            login: 'admin',
            password: 'admin',
            firstName: 'Administrator',
            lastName: 'Administrator',
            email: 'admin@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: 'system',
            lastModifiedBy: 'system'
        };
        this.user4 = {
            login: 'user',
            password: 'user',
            firstName: 'User',
            lastName: 'User',
            email: 'user@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: 'system',
            lastModifiedBy: 'system'
        };
    }
    async up(queryRunner) {
        const conn = queryRunner.connection;
        await conn
            .createQueryBuilder()
            .insert()
            .into(authority_entity_1.Authority)
            .values([this.role1, this.role2])
            .execute();
        await conn
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values([this.user1, this.user2, this.user3, this.user4])
            .execute();
        await conn
            .createQueryBuilder()
            .relation(user_entity_1.User, 'authorities')
            .of([this.user1, this.user3])
            .add([this.role1, this.role2]);
        await conn
            .createQueryBuilder()
            .relation(user_entity_1.User, 'authorities')
            .of(this.user4)
            .add([this.role2]);
    }
    // eslint-disable-next-line
    async down(queryRunner) { }
}
exports.SeedUsersRoles1570200490072 = SeedUsersRoles1570200490072;
//# sourceMappingURL=1570200490072-SeedUsersRoles.js.map