import {MigrationInterface, QueryRunner} from "typeorm";

export class TruckWeightHistory1614701788813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "truckWeightHistory" ("id" varchar PRIMARY KEY NOT NULL, "loadedWeight" integer NOT NULL, createdAt VARCHAR, "truckId" varchar, CONSTRAINT "FK_truck_id_in_trucks" FOREIGN KEY ("truckId") REFERENCES "truck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "truckWeightHistory"`);
    }

}
