"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + "/domain/*.entity{.ts,.js}"],
    MIGRATIONS: [__dirname + "/migrations/**/*{.ts,.js}"],
    CLI: {
        migrationsDir: "src/migrations"
    },
    MIGRATIONS_RUN: true
};
let ormconfig = {
    name: "default",
    type: "sqlite",
    database: "../target/sqlite-dev-db.sql",
    logging: true,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN
};
exports.ormconfig = ormconfig;
if (process.env.NODE_ENV === "prod") {
    exports.ormconfig = ormconfig = {
        name: "default",
        type: "mongodb",
        database: "chatbotsmn",
        url: "mongodb://turtuvshin:turtuvshin1@ds211648.mlab.com:11648/chatbotsmn",
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN
    };
}
if (process.env.NODE_ENV === "dev") {
    exports.ormconfig = ormconfig = {
        name: "default",
        type: "mongodb",
        database: "chatbotsmn",
        url: "mongodb://turtuvshin:turtuvshin1@ds211648.mlab.com:11648/chatbotsmn",
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN
    };
}
//# sourceMappingURL=orm.config.js.map