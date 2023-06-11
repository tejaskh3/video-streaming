const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const connectDB = require('./connect/connect')
app.use(bodyParser.json())

//importing routes
const authRouter = require('./routes/User');
app.use('/api/v1',authRouter);

//connecting to data-base
const port = process.env.PORT || 8080
const start = async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to database");
     app.listen(port,()=>{
      console.log(`Server is listening on  https://localhost:${port}...`);
    })
  } catch (error) {
    console.log(`${error}, this error is in connecting database`);
  }
}

start();

