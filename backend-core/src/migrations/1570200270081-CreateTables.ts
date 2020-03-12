import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1570200270081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (process.env.NODE_ENV === 'prod') {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }

      await queryRunner.connection.synchronize();
    }
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
