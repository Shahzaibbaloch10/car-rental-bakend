const joi = require('joi');

const carvalidation = (req , res, next )=>{
const schema = joi.object({
    ownerid: Joi.string().required(),
brand: joi.string().min(3).max(100).required(),
carmodel: joi.string().min(3).max(100).required(),
year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
type: joi.string().min(3).max(100).required(),
price: joi.string().min(3).max(100).required(),
available: Joi.boolean().required(), 
images: Joi.array().items(Joi.string().uri()).min(1).required() 


})
const { error } = schema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message });
}
next();
}
module.exports= carvalidation;


