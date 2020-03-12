"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateTables1570200270081 {
    async up(queryRunner) {
        if (process.env.NODE_ENV === 'prod') {
            if (queryRunner.isTransactionActive) {
                await queryRunner.commitTransaction();
            }
            await queryRunner.connection.synchronize();
        }
    }
    // eslint-disable-next-line
    async down(queryRunner) { }
}
exports.CreateTables1570200270081 = CreateTables1570200270081;
//# sourceMappingURL=1570200270081-CreateTables.js.map