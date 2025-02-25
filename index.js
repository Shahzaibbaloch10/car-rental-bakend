const express = require('express');
const port = process.env.port||8080 ;
const app = express();
const bodyParser= require('body-parser')
require('dotenv').config();
const mongodb = require('mongoose');
const router = require('./routes/userrouter');
const carrouter= require('./routes/carsrouter');
const authrouter= require('./routes/auth');
const dbconnect= process.env.db;
const cors = require('cors');
const cookieParser = require('cookie-parser');
mongodb.connect(dbconnect)
.then(()=>{
console.log('db is conected')
})
.catch((err)=>{
    console.log(err)
})
app.use(cors({
    origin: "http://localhost:3000", // ✅ Frontend ka URL allow karo
    credentials: true, // ✅ Cookies aur authentication ke liye zaroori
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // ✅ Sab methods allow karo
    allowedHeaders: "Content-Type,Authorization", // ✅ Headers allow karo
}));
// app.use(bodyParser.json({ limit: '50mb' })); // Default: 100KB → Now: 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use('/user', router);
app.use('/car' ,carrouter);
app.use('/auth',authrouter);

app.listen(port ,()=>console.log(`server started ${port}  `))