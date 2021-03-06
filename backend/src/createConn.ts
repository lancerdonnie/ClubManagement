import { getConnection } from 'typeorm';
import { Club } from './entity/Club';

const { createConnection } = require('typeorm');

const createConn = async () => {
  try {
    await createConnection();
    console.log('Database Connected');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const closeConn = async () => {
  try {
    await getConnection().close();
    console.log('Database Connection Closed');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createConn, closeConn };
