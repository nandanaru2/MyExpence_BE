// src/models/index.ts
import sequelize from '../config/db';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    await sequelize.sync( { alter: true } ); // Use 'force: false' in production
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {  syncDatabase };
