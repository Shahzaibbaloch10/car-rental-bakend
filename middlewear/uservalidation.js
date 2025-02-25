const joi = require('joi');



const signupvalidation  = (req, res , next)=>{
    const schema = joi.object({
fname: joi.string().min(3).max(50).required(),
lname: joi.string().min(3).max(50).required(),
mobile: joi.string().min(3).max(50).required(),
email: joi.string().email().required(),
password: joi.string().min(3).max(100).required(),
age: joi.string().min(3).max(100).required(),

    });
    const {error}= schema.validate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message,  });
    };
    next();
};


const loginvalidation = (req,res , next )=>{

const schema = joi.object({
email:joi.string().email().required(),
password:joi.string().min(3).max(100).required(),

})
const {error}= schema.validate(req.body);
if(error){
return res.status(400).json({message:"bad requist",  error: error.details[0].message })
};
next();
}
module.exports= {
signupvalidation,
loginvalidation

}


