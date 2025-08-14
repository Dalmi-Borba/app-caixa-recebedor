let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
const routes = require('./routes');
require('dotenv/config');

// [ADD] sessão + store + passport
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./auth/passport');

// Conexão Mongo
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('connected');
  });

// Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS + static
app.set('view engine', 'ejs');
app.use(express.static('public'));

// [ADD] Sessão (salva no Mongo)
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 8 } // 8h
}));

// [ADD] Passport
app.use(passport.initialize());
app.use(passport.session());

// [ADD] variáveis globais nas views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.query = req.query || {};
  next();
});

// Rotas (inclui públicas e protegidas)
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('on', PORT));
