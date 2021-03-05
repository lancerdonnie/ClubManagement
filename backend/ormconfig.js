const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  type: !isTestEnv ? 'postgres' : 'sqlite',
  host: process.env.PG_HOST,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: 3306,
  database: !isTestEnv ? process.env.PG_DATABASE : ':memory:',
  synchronize: true,
  // logging: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: ['{dist,src}/entity/*{.ts,.js}'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
