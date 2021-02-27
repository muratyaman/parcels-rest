import {MigrationInterface, QueryRunner} from "typeorm";

export class migration11614452617067 implements MigrationInterface {
    name = 'migration11614452617067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "truck" ("id" varchar PRIMARY KEY NOT NULL, "reg" varchar(10) NOT NULL, "make" varchar(50) NOT NULL, "model" varchar(50) NOT NULL, "emptyWeight" integer NOT NULL, "loadedWeight" integer NOT NULL, CONSTRAINT "UQ_5b1a914eb1c36473301f83e48f1" UNIQUE ("reg"))`);
        await queryRunner.query(`CREATE TABLE "parcel" ("id" varchar PRIMARY KEY NOT NULL, "weight" integer NOT NULL, "truckId" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar(50) NOT NULL, "passwordHash" varchar(250) NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar(50) NOT NULL, "role" varchar(20) NOT NULL DEFAULT ('GUEST'), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "temporary_parcel" ("id" varchar PRIMARY KEY NOT NULL, "weight" integer NOT NULL, "truckId" varchar, CONSTRAINT "FK_d0038189666088cc369d81a1393" FOREIGN KEY ("truckId") REFERENCES "truck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_parcel"("id", "weight", "truckId") SELECT "id", "weight", "truckId" FROM "parcel"`);
        await queryRunner.query(`DROP TABLE "parcel"`);
        await queryRunner.query(`ALTER TABLE "temporary_parcel" RENAME TO "parcel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" RENAME TO "temporary_parcel"`);
        await queryRunner.query(`CREATE TABLE "parcel" ("id" varchar PRIMARY KEY NOT NULL, "weight" integer NOT NULL, "truckId" varchar)`);
        await queryRunner.query(`INSERT INTO "parcel"("id", "weight", "truckId") SELECT "id", "weight", "truckId" FROM "temporary_parcel"`);
        await queryRunner.query(`DROP TABLE "temporary_parcel"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "parcel"`);
        await queryRunner.query(`DROP TABLE "truck"`);
    }

}
