module.exports = {
  type: 'postgres',
  url:
    'postgres://ytrtpcuvgaxgfv:8b621075082644b38d96acd5ccb3a1a3855ae44fb84be4ab3b3dfc165c2be989@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d2374lgr0jk5t8',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/modules/**/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/modules/**/infra/typeorm/migrations/',
  },
};
