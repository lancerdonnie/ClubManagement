import { getConnection } from 'typeorm';

const { createConnection } = require('typeorm');

const createConn = async () => {
  try {
    await createConnection();
    console.log('Database Connected');
    // await Club.query(`UPDATE club SET name = $2 where name =  $1`, ['footb', 'golf']);
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
