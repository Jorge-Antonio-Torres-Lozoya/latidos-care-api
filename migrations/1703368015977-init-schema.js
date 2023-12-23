const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitSchema1703368015977 {
    name = 'InitSchema1703368015977'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`treatment\` (\`treatmentId\` int NOT NULL AUTO_INCREMENT, \`taken\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`medicationMedicationId\` int NULL, PRIMARY KEY (\`treatmentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sickness\` (\`sicknessId\` int NOT NULL AUTO_INCREMENT, \`sicknessName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, PRIMARY KEY (\`sicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medication\` (\`medicationId\` int NOT NULL AUTO_INCREMENT, \`medicationName\` varchar(255) NOT NULL, \`timeConsumption\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, \`sicknessSicknessId\` int NULL, PRIMARY KEY (\`medicationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tracking_value\` (\`trackingValueId\` int NOT NULL AUTO_INCREMENT, \`trackingValueName\` varchar(255) NOT NULL, \`minLimit\` int NOT NULL, \`maxLimit\` int NOT NULL, \`currentValue\` int NOT NULL, \`alertActivated\` tinyint NOT NULL DEFAULT 0, \`minValueAlertActivated\` tinyint NOT NULL DEFAULT 0, \`maxValueAlertActivated\` tinyint NOT NULL DEFAULT 0, \`personalizedAlertMinValue\` text NULL, \`personalizedAlertMaxValue\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, PRIMARY KEY (\`trackingValueId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`current_value\` (\`currentValueId\` int NOT NULL AUTO_INCREMENT, \`currentNumber\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, \`trackingValueTrackingValueId\` int NULL, PRIMARY KEY (\`currentValueId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` int NOT NULL, \`dni\` varchar(255) NULL, \`tutorFirstName\` varchar(255) NULL, \`tutorLastName\` varchar(255) NULL, \`tutorPhoneNumber\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`verificationCode\` int NULL, \`registerData\` tinyint NOT NULL DEFAULT 0, \`verificationTokenUser\` varchar(255) NULL, \`isLogin\` tinyint NOT NULL DEFAULT 1, \`verificationTokenExpiration\` datetime NULL, \`reset_password_token\` varchar(255) NULL, \`verification\` tinyint NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_5b494fc54a2e3d122f17b39359\` (\`reset_password_token\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`allergy\` (\`allergyId\` int NOT NULL AUTO_INCREMENT, \`allergyName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, PRIMARY KEY (\`allergyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`adminId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`tokenUser\` varchar(255) NULL, \`isLogin\` tinyint NOT NULL DEFAULT 1, \`reset_password_token\` varchar(255) NULL, \`verification\` tinyint NULL, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), UNIQUE INDEX \`IDX_22c893796028a1072135d82b0e\` (\`reset_password_token\`), PRIMARY KEY (\`adminId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`personalized_sickness\` (\`personalizedSicknessId\` int NOT NULL AUTO_INCREMENT, \`minLimit\` int NULL, \`maxLimit\` int NULL, \`currentValue\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, \`sicknessSicknessId\` int NULL, PRIMARY KEY (\`personalizedSicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_sickness\` (\`PK_aplicantesEmpleos\` int NOT NULL AUTO_INCREMENT, \`userUserId\` int NULL, \`sicknessSicknessId\` int NULL, PRIMARY KEY (\`PK_aplicantesEmpleos\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`treatment\` ADD CONSTRAINT \`FK_afa1277f1346a25c2fffbf7b3e9\` FOREIGN KEY (\`medicationMedicationId\`) REFERENCES \`medication\`(\`medicationId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sickness\` ADD CONSTRAINT \`FK_fdb4477ba6de08fab205488347b\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medication\` ADD CONSTRAINT \`FK_af470cdd450f78747feaaccc72b\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medication\` ADD CONSTRAINT \`FK_c23daaab69493c51531498ea4b0\` FOREIGN KEY (\`sicknessSicknessId\`) REFERENCES \`sickness\`(\`sicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracking_value\` ADD CONSTRAINT \`FK_1132757bef68bca0b10e7288a76\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`current_value\` ADD CONSTRAINT \`FK_30bafa969e7607e4f13a8a9c6be\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`current_value\` ADD CONSTRAINT \`FK_bebfa9d5739feb5c744c05b1c7d\` FOREIGN KEY (\`trackingValueTrackingValueId\`) REFERENCES \`tracking_value\`(\`trackingValueId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`allergy\` ADD CONSTRAINT \`FK_16e772c96d83329f5a18ad8f370\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` ADD CONSTRAINT \`FK_7116b20cc7c47f152f0ac6bb979\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` ADD CONSTRAINT \`FK_8e78a5d7a744a14a663e9888c14\` FOREIGN KEY (\`sicknessSicknessId\`) REFERENCES \`sickness\`(\`sicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` ADD CONSTRAINT \`FK_e1dd6501e651518f0979f822ba3\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` ADD CONSTRAINT \`FK_606035a7214a0f407804e2b00b7\` FOREIGN KEY (\`sicknessSicknessId\`) REFERENCES \`sickness\`(\`sicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_sickness\` DROP FOREIGN KEY \`FK_606035a7214a0f407804e2b00b7\``);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` DROP FOREIGN KEY \`FK_e1dd6501e651518f0979f822ba3\``);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` DROP FOREIGN KEY \`FK_8e78a5d7a744a14a663e9888c14\``);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` DROP FOREIGN KEY \`FK_7116b20cc7c47f152f0ac6bb979\``);
        await queryRunner.query(`ALTER TABLE \`allergy\` DROP FOREIGN KEY \`FK_16e772c96d83329f5a18ad8f370\``);
        await queryRunner.query(`ALTER TABLE \`current_value\` DROP FOREIGN KEY \`FK_bebfa9d5739feb5c744c05b1c7d\``);
        await queryRunner.query(`ALTER TABLE \`current_value\` DROP FOREIGN KEY \`FK_30bafa969e7607e4f13a8a9c6be\``);
        await queryRunner.query(`ALTER TABLE \`tracking_value\` DROP FOREIGN KEY \`FK_1132757bef68bca0b10e7288a76\``);
        await queryRunner.query(`ALTER TABLE \`medication\` DROP FOREIGN KEY \`FK_c23daaab69493c51531498ea4b0\``);
        await queryRunner.query(`ALTER TABLE \`medication\` DROP FOREIGN KEY \`FK_af470cdd450f78747feaaccc72b\``);
        await queryRunner.query(`ALTER TABLE \`sickness\` DROP FOREIGN KEY \`FK_fdb4477ba6de08fab205488347b\``);
        await queryRunner.query(`ALTER TABLE \`treatment\` DROP FOREIGN KEY \`FK_afa1277f1346a25c2fffbf7b3e9\``);
        await queryRunner.query(`DROP TABLE \`user_sickness\``);
        await queryRunner.query(`DROP TABLE \`personalized_sickness\``);
        await queryRunner.query(`DROP INDEX \`IDX_22c893796028a1072135d82b0e\` ON \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`allergy\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b494fc54a2e3d122f17b39359\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`current_value\``);
        await queryRunner.query(`DROP TABLE \`tracking_value\``);
        await queryRunner.query(`DROP TABLE \`medication\``);
        await queryRunner.query(`DROP TABLE \`sickness\``);
        await queryRunner.query(`DROP TABLE \`treatment\``);
    }
}
