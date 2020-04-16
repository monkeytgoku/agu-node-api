const express = require('express');
const dotenv = require('dotenv');
// *required add .env to process.env
const configs = require('./configs');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// *required connect DB
const mongooseConn = require('./configs/mongoose.config');
const routes = require('./routes');
const jwt = require('express-jwt');
const publicRoutes = ['/api/v1/login', '/src/assets/*', '/api/v1/refresh'];

dotenv.config({
  path: '.env'
});
const app = express();
app.set('port', process.env.PORT || 9999);

app.use(morgan("dev"));
app.use(cors({
  origin: [
    'http://localhost:4200',
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json(
  {limit: '50mb'}
));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use('/src/assets', express.static(process.env.ASSETS_PATH));
app.use(jwt({ secret: configs.secret.SESSION_SECRET}).unless({path: publicRoutes}));
app.use('/', routes);

module.exports = app;
