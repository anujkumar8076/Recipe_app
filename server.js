const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const env=require('dotenv');
const connectDB = require('./Config/db');
const authRoutes=require("./Routes/authRoutes");
const userRoutes=require("./Routes/userRoutes");
const recipeRoutes=require("./Routes/recipeRoutes");

env.config();
connectDB();

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use('/api/recipe',recipeRoutes);
app.use('/api/users', userRoutes);
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})