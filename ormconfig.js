module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: 5432,
  database: process.env.PG_DATABASE,
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
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
