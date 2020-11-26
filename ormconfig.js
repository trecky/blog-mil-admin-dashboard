module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/blogmil_dashboard",
  "entities": ["./dist/modules/**/infra/typeorm/entities/*.js"],
  "migrations": ["./dist/modules/**/infra/typeorm/migrations/*.js"],
  "cli": {
    "migrationsDir": "./dist/modules/**/infra/typeorm/migrations/"
  }
}
