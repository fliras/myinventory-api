import 'module-alias/register'
import setupApp from '@/main/config/app';
import db from '@/infra/database/knex/db';

const API_PORT = process.env.API_PORT ?? 3000;
const app = setupApp();

db.raw('SELECT 1')
  .then(() => {
    app.listen(API_PORT, () => {
      console.log(`API running on *:${API_PORT}`);
    });
  })
  .catch((err) => console.log(err));
