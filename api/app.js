const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const {
  authRoutes,
  userRoutes,
  productRoutes,
  orderRoutes,
} = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.use(errorMiddleware);

module.exports = app;
