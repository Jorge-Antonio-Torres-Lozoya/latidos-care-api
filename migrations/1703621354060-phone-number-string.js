const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PhoneNumberString1703621354060 {
    name = 'PhoneNumberString1703621354060'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tutorPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tutorPhoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`phoneNumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tutorPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tutorPhoneNumber\` int NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tutorPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tutorPhoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tutorPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tutorPhoneNumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`phoneNumber\` int NULL`);
    }
}
