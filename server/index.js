const express = require('express');
const app = express();
const cors = require('cors');
const { assertRequiredEnvVars } = require('./utils/env');

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const productsRouter = require('./routes/products');
app.use('/', productsRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

const internalRouter = require('./routes/internal');
app.use('/internal', internalRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

assertRequiredEnvVars([
  'JWT_SECRET',
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'INTERNAL_API_TOKEN',
]);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('server running on port 3001');
  });
});
