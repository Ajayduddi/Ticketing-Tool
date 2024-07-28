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

// cors setup
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://ajayduddi.github.io/Ticketing-Tool/",
      "https://ticket.test:4200/",
    ],
    credentials: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  })
);

// session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,// 1 day
    httpOnly: true,
    secure: false, // set to true if you only serve the app over https
    sameSite: 'Lax',
  },
  store: mongoStore.create({
    client: mongoose.connection.getClient(),
    collection: 'sessions',
    crypto: {
      secret: process.env.SESSION_SECRET,
    },
  })
}))

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
