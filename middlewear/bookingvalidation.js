const joi= require('joi');



const booingvalidation =(req,res,next)=>{
    const schema = joi.object({
       
        pickupdate:joi.string().min(3).max(50).required(),
        dropdate:joi.string().min(3).max(50).required(),
        pickuptime:joi.string().min(3).max(50).required(),
        droptime:joi.string().min(3).max(50).required(),
        location:joi.string().min(3).max(200).required(),

    })
    const {error}= schema.validate(req.body);
    if(error){
return res.status(400).json({
    error:error.details[0].message
})

    }
    next()
}
module.exports= booingvalidation;