import { Pool } from 'pg';

const pool = new Pool({
  host: 'database-1-instance-1.c3iccwgumxo6.ap-northeast-1.rds.amazonaws.com',
  user: 'ttcohpuser1',
  password: 'ejs$dNcsAgsi_0518',
  database: 'postgres',
});

export default pool;