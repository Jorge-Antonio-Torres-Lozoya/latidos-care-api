const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitSchema1708143981963 {
    name = 'InitSchema1708143981963'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`treatment\` (\`treatmentId\` int NOT NULL AUTO_INCREMENT, \`taken\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`medicationSicknessMedicationSicknessId\` int NULL, PRIMARY KEY (\`treatmentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medication\` (\`medicationId\` int NOT NULL AUTO_INCREMENT, \`medicationName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`medicationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sickness\` (\`sicknessId\` int NOT NULL AUTO_INCREMENT, \`sicknessName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`sicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_sickness\` (\`userSicknessId\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, \`sicknessSicknessId\` int NULL, UNIQUE INDEX \`IDX_ba4eefac7bb5cd869d31813061\` (\`slug\`), PRIMARY KEY (\`userSicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medication_sickness\` (\`medicationSicknessId\` int NOT NULL AUTO_INCREMENT, \`timeConsumption\` int NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, \`userSicknessUserSicknessId\` int NULL, \`medicationMedicationId\` int NULL, UNIQUE INDEX \`IDX_e3f063dd3282eace00b05f7073\` (\`slug\`), PRIMARY KEY (\`medicationSicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`allergy\` (\`allergyId\` int NOT NULL AUTO_INCREMENT, \`allergyName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`allergyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_allergy\` (\`userAllergyId\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, \`allergyAllergyId\` int NULL, PRIMARY KEY (\`userAllergyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`roleId\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_account\` (\`roleAccountId\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, \`roleRoleId\` int NULL, PRIMARY KEY (\`roleAccountId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`data_access_consent\` (\`consentId\` int NOT NULL AUTO_INCREMENT, \`consent\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, PRIMARY KEY (\`consentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`accountId\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`resetPasswordToken\` varchar(255) NULL, \`verificationTokenExpiration\` datetime NULL, \`activeRole\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`phoneNumber\` varchar(255) NOT NULL, \`dni\` varchar(255) NULL, \`tutorFirstName\` varchar(255) NULL, \`tutorLastName\` varchar(255) NULL, \`tutorPhoneNumber\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`verificationCode\` int NULL, \`registerData\` tinyint NOT NULL DEFAULT 0, \`verificationTokenUser\` varchar(255) NULL, \`isLogin\` tinyint NOT NULL DEFAULT 1, \`active\` tinyint NOT NULL DEFAULT 1, \`verification\` tinyint NULL, UNIQUE INDEX \`IDX_d4ab593c192bae26a6cf638633\` (\`slug\`), UNIQUE INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` (\`email\`), PRIMARY KEY (\`accountId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tracking_value\` (\`trackingValueId\` int NOT NULL AUTO_INCREMENT, \`trackingValueName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`trackingValueId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tracking_value\` (\`userTrackingValueId\` int NOT NULL AUTO_INCREMENT, \`minLimit\` int NOT NULL, \`maxLimit\` int NOT NULL, \`currentValue\` int NOT NULL, \`alertActivated\` tinyint NOT NULL DEFAULT 0, \`minValueAlertActivated\` tinyint NOT NULL DEFAULT 0, \`maxValueAlertActivated\` tinyint NOT NULL DEFAULT 0, \`personalizedAlertMinValue\` text NULL, \`personalizedAlertMaxValue\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountAccountId\` int NULL, \`trackingValueTrackingValueId\` int NULL, PRIMARY KEY (\`userTrackingValueId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`current_value\` (\`currentValueId\` int NOT NULL AUTO_INCREMENT, \`currentNumber\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userTrackingValueUserTrackingValueId\` int NULL, PRIMARY KEY (\`currentValueId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`adminId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`tokenUser\` varchar(255) NULL, \`isLogin\` tinyint NOT NULL DEFAULT 1, \`reset_password_token\` varchar(255) NULL, \`verification\` tinyint NULL, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), UNIQUE INDEX \`IDX_22c893796028a1072135d82b0e\` (\`reset_password_token\`), PRIMARY KEY (\`adminId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`dni\` varchar(255) NULL, \`tutorFirstName\` varchar(255) NULL, \`tutorLastName\` varchar(255) NULL, \`tutorPhoneNumber\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`verificationCode\` int NULL, \`registerData\` tinyint NOT NULL DEFAULT 0, \`verificationTokenUser\` varchar(255) NULL, \`isLogin\` tinyint NOT NULL DEFAULT 1, \`active\` tinyint NOT NULL DEFAULT 1, \`verificationTokenExpiration\` datetime NULL, \`reset_password_token\` varchar(255) NULL, \`verification\` tinyint NULL, UNIQUE INDEX \`IDX_ac08b39ccb744ea6682c0db1c2\` (\`slug\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_5b494fc54a2e3d122f17b39359\` (\`reset_password_token\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`personalized_sickness\` (\`personalizedSicknessId\` int NOT NULL AUTO_INCREMENT, \`minLimit\` int NULL, \`maxLimit\` int NULL, \`currentValue\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, \`sicknessSicknessId\` int NULL, PRIMARY KEY (\`personalizedSicknessId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`treatment\` ADD CONSTRAINT \`FK_d0c442d861945c6f4895a6308d8\` FOREIGN KEY (\`medicationSicknessMedicationSicknessId\`) REFERENCES \`medication_sickness\`(\`medicationSicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` ADD CONSTRAINT \`FK_8192a79298c3e638dc90c730250\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` ADD CONSTRAINT \`FK_606035a7214a0f407804e2b00b7\` FOREIGN KEY (\`sicknessSicknessId\`) REFERENCES \`sickness\`(\`sicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` ADD CONSTRAINT \`FK_7e8c162404feffb7291a39fb487\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` ADD CONSTRAINT \`FK_142bb7c223d7d0e81b2271e4a03\` FOREIGN KEY (\`userSicknessUserSicknessId\`) REFERENCES \`user_sickness\`(\`userSicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` ADD CONSTRAINT \`FK_f65b176fbdac5bde70f8ee9d394\` FOREIGN KEY (\`medicationMedicationId\`) REFERENCES \`medication\`(\`medicationId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_allergy\` ADD CONSTRAINT \`FK_7226eda20ba69d991d8df4153a8\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_allergy\` ADD CONSTRAINT \`FK_ee12094fa63a53f7fba16863c9a\` FOREIGN KEY (\`allergyAllergyId\`) REFERENCES \`allergy\`(\`allergyId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_account\` ADD CONSTRAINT \`FK_fcf169dadeebbe590b758af60e5\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_account\` ADD CONSTRAINT \`FK_95ec9911f39a22dd8ab08b6b1f5\` FOREIGN KEY (\`roleRoleId\`) REFERENCES \`role\`(\`roleId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`data_access_consent\` ADD CONSTRAINT \`FK_9d44c101520e04c354e117e7a60\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tracking_value\` ADD CONSTRAINT \`FK_1fa2962c14b62fb00e7dda5ce95\` FOREIGN KEY (\`accountAccountId\`) REFERENCES \`account\`(\`accountId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tracking_value\` ADD CONSTRAINT \`FK_d5bd6c6d6de9f3f947d7529f09f\` FOREIGN KEY (\`trackingValueTrackingValueId\`) REFERENCES \`tracking_value\`(\`trackingValueId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`current_value\` ADD CONSTRAINT \`FK_19678a4033316db49b59165da9e\` FOREIGN KEY (\`userTrackingValueUserTrackingValueId\`) REFERENCES \`user_tracking_value\`(\`userTrackingValueId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` ADD CONSTRAINT \`FK_7116b20cc7c47f152f0ac6bb979\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` ADD CONSTRAINT \`FK_8e78a5d7a744a14a663e9888c14\` FOREIGN KEY (\`sicknessSicknessId\`) REFERENCES \`sickness\`(\`sicknessId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` DROP FOREIGN KEY \`FK_8e78a5d7a744a14a663e9888c14\``);
        await queryRunner.query(`ALTER TABLE \`personalized_sickness\` DROP FOREIGN KEY \`FK_7116b20cc7c47f152f0ac6bb979\``);
        await queryRunner.query(`ALTER TABLE \`current_value\` DROP FOREIGN KEY \`FK_19678a4033316db49b59165da9e\``);
        await queryRunner.query(`ALTER TABLE \`user_tracking_value\` DROP FOREIGN KEY \`FK_d5bd6c6d6de9f3f947d7529f09f\``);
        await queryRunner.query(`ALTER TABLE \`user_tracking_value\` DROP FOREIGN KEY \`FK_1fa2962c14b62fb00e7dda5ce95\``);
        await queryRunner.query(`ALTER TABLE \`data_access_consent\` DROP FOREIGN KEY \`FK_9d44c101520e04c354e117e7a60\``);
        await queryRunner.query(`ALTER TABLE \`role_account\` DROP FOREIGN KEY \`FK_95ec9911f39a22dd8ab08b6b1f5\``);
        await queryRunner.query(`ALTER TABLE \`role_account\` DROP FOREIGN KEY \`FK_fcf169dadeebbe590b758af60e5\``);
        await queryRunner.query(`ALTER TABLE \`user_allergy\` DROP FOREIGN KEY \`FK_ee12094fa63a53f7fba16863c9a\``);
        await queryRunner.query(`ALTER TABLE \`user_allergy\` DROP FOREIGN KEY \`FK_7226eda20ba69d991d8df4153a8\``);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` DROP FOREIGN KEY \`FK_f65b176fbdac5bde70f8ee9d394\``);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` DROP FOREIGN KEY \`FK_142bb7c223d7d0e81b2271e4a03\``);
        await queryRunner.query(`ALTER TABLE \`medication_sickness\` DROP FOREIGN KEY \`FK_7e8c162404feffb7291a39fb487\``);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` DROP FOREIGN KEY \`FK_606035a7214a0f407804e2b00b7\``);
        await queryRunner.query(`ALTER TABLE \`user_sickness\` DROP FOREIGN KEY \`FK_8192a79298c3e638dc90c730250\``);
        await queryRunner.query(`ALTER TABLE \`treatment\` DROP FOREIGN KEY \`FK_d0c442d861945c6f4895a6308d8\``);
        await queryRunner.query(`DROP TABLE \`personalized_sickness\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b494fc54a2e3d122f17b39359\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac08b39ccb744ea6682c0db1c2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_22c893796028a1072135d82b0e\` ON \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`current_value\``);
        await queryRunner.query(`DROP TABLE \`user_tracking_value\``);
        await queryRunner.query(`DROP TABLE \`tracking_value\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_d4ab593c192bae26a6cf638633\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`data_access_consent\``);
        await queryRunner.query(`DROP TABLE \`role_account\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`user_allergy\``);
        await queryRunner.query(`DROP TABLE \`allergy\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3f063dd3282eace00b05f7073\` ON \`medication_sickness\``);
        await queryRunner.query(`DROP TABLE \`medication_sickness\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba4eefac7bb5cd869d31813061\` ON \`user_sickness\``);
        await queryRunner.query(`DROP TABLE \`user_sickness\``);
        await queryRunner.query(`DROP TABLE \`sickness\``);
        await queryRunner.query(`DROP TABLE \`medication\``);
        await queryRunner.query(`DROP TABLE \`treatment\``);
    }
}
