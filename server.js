const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRouter = require('./routers/auth.router')
const videoRouter = require('./routers/videoRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.MONGODB_DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

connectDB();
  
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send('Welcome to Video Management API')
})
app.use('/auth', authRouter);
app.use('/api/videos', videoRouter);

app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT)
})

module.exports = app;