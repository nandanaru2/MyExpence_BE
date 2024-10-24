// src/config/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('MonoMicro', 'postgres', 'Nandan333in!', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 20,
    idle: 30000,
    acquire: 60000,
  },
});

export default sequelize;
