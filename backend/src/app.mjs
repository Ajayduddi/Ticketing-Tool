import express from "express";
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import 'dotenv/config';
import apiRouter from '../src/routes/index.mjs';
import cors from 'cors';

// app setup
const app = express();
const port = process.env.PORT || 3000;

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});
 
// set-up cors
app.use(cors({
  origin: 'https://ajayduddi.github.io',
  credentials: true,
  maxAge: 1 * 24 * 60 * 60, // 1 day
}));
 

// Add custom CORS headers (if necessary)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ajayduddi.github.io');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Set-Cookie , Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});


// handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://ajayduddi.github.io');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Set-Cookie , Access-Control-Request-Method, Access-Control-Request-Headers');
  res.sendStatus(204);
});

// for production
app.set('trust proxy', 1);

// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: true, // Ensure secure cookies if using HTTPS
    sameSite: 'none',
  },
  store: mongoStore.create({
    client: mongoose.connection.getClient(),
    collection: 'sessions',
    secret: process.env.SESSION_SECRET,
  }),
}));


// passport setup
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(express.json()); // accept json data from client
app.use(express.urlencoded({ extended: true })); // accept url encoded data from client

// main routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// api routes
app.use('/api', apiRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ result: false, message: "something broke", data: err.stack });
});

// listen on port
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
