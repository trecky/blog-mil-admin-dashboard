console.log(process.env.DATABASE_URL);
module.exports = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/blogmil_dashboard',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/modules/**/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/modules/**/infra/typeorm/migrations/',
  },
};
