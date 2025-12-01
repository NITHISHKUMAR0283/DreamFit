require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const app = express();
const qs = require('qs');

const connectDB=require('./config/db');
const productRoutes = require("./routes/productRoute");
const authRoutes = require('./routes/authRoute');
const publicProductRoute= require("./routes/productPublicRoute")

app.set('query parser', str => qs.parse(str));
app.use(helmet())
connectDB();
const cors = require('cors');
app.use(cors({origin:'http://localhost:3000',credentials:true,}))
app.use(express.json());
app.use("/api/v1",productRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1",publicProductRoute);
app.get('/',(req,res) => {res.send("E-commerse API is running....");});
const PORT=process.env.PORT||6000;
app.listen(PORT,() => {console.log(`Server running in the ${process.env.NODE_ENV} made on port ${PORT}`);});