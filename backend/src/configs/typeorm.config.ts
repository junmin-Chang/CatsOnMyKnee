import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOST || 'localhost',
  port: 5432,
  username: process.env.RDS_USERNAME || 'postgres',
  password: process.env.RDS_PASSWORD || '0219',
  database: process.env.DB_NAME || 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
