const { signupvalidation, loginvalidation } = require('../middlewear/uservalidation');
const usermodel = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const jwttoken = require('jsonwebtoken');
const varify = require('../middlewear/varify');
const router = express.Router();
router.post('/signup', signupvalidation, async (req, res) => {
    try {
        const { fname, lname, mobile, email, password, age } = req.body;

        const existingUser = await usermodel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "user is already access , you cane login ", success: false
            })
        }
        const users = new usermodel({ fname, lname, mobile, email, password, age });
        users.password = await bcrypt.hash(password, 10);
        await users.save();
        const jwt = jwttoken.sign( 
            { email: users.email, _id: users._id },
            process.env.jwt_code,
            { expiresIn: '20h' }

        )
        res.cookie("token", jwt, {
            httpOnly: true,
            secure: false,

            sameSite: "lax",
        });
        return res.status(200).json({
            message: "signup success",
            success: true


        })

    }
    catch (error) {
        return res.status(400).json({

            message: "internal server error " + error.message,
            success: false

        })


    }



})


router.post('/login', loginvalidation, async (req, res) => {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "email is unvalid plz try diffrent",
            success: false

        })
    }
    const passcompare = await bcrypt.compare(password, user.password);
    if (!passcompare) {
        return res.status(400).json({
            message: "password is unvalid is unvalid plz try diffrent",
            success: false

        })
    }

    const jwt = jwttoken.sign(
        { email: user.email, _id: user._id },
        process.env.jwt_code,
        { expiresIn: '20h' }

    )
    res.cookie("token", jwt, {
        httpOnly: true,
        secure: false,

        sameSite: "lax",
    });
    res.status(200).json({
        message: "login success",
        jwt,
        email,
        name: user.fname


    })




})
router.post('/logout' ,async(req,res)=>{
res.clearCookie("token",{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
})
res.send({success :true,message:"logoutcokies"})
} )

router.get('/profile' ,varify ,async (req,res)=>{
try {
    const userid = req.user._id;
const user= await usermodel.findById(userid)
if(!user){
    res.status(400).json({
success:"false",
message:'this id is not valid'
    })
}

res.status(200).json({
    success:true,
    user
})
} catch (error) {
    res.status(400).json({ success: false, message: "nul", error: error })
    console.log(error)
}

} )


module.exports =
    router
