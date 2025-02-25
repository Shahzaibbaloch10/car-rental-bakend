const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/verify',(req,res)=>{
    // console.log("Cookies:", req.cookies);
    const token =req.cookies.token;
if(!token){

    return res.json({
success:false,
message:"no token found"
    })
}
try {
    const decoded =jwt.verify(token,process.env.jwt_code)
   
    return res.json({ success: true, user: decoded });
   
} catch (error) {
    return res.json({ success: false, message: "Invalid token" });    
}




})
module.exports = router;