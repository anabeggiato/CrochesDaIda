const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors());

const db = require('./models');

//Routers
const productsRouter = require('./routes/products')
app.use('/produtos', productsRouter)

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

const homeRouter = require('./routes/home')
app.use('/', homeRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server running on port 3001');
    });
});