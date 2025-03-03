const express = require('express');
const router = express.Router();
// const carvalidation = require('../middlewear/carvalidation');
const upload = require('../middlewear/cloudinarySetup');
const carschema = require('../models/car');
// const auth = require('./auth')
const auth = require('./auth');
const varify = require('../middlewear/varify');
const { default: mongoose } = require('mongoose');
router.post('/add-car', upload.array("images", 5), async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);
    try {
        const { ownerid, brand, carmodel, year, type, address, price, available } = req.body;

        // const ownerid= req.user.id;
        const imageUrls = req.files ? req.files.map((file) => file.path) : [];

        if (!imageUrls || imageUrls.length < 2) {
            return res.status(400).json({ error: "At least 2 images are required" });
        }
        console.log(imageUrls)
        const car = new carschema({
            ownerid, brand, carmodel, year, type, address, price, available, images: imageUrls

        });

        await car.save();
        res.status(200).json({
            message: "car successfulyy add", car: car
        })

    } catch (error) {

        res.status(500).json({ error: "Error adding car", error });
        console.log(error)

    }




})

router.get('/all-cars', async (req, res) => {
    try {
        const allcars = await carschema.find({})
        res.status(200).json({ success: true, message: 'all cars', car: allcars })
    } catch (error) {
        res.status(400).json({ success: false, message: 'null', error: error })
    }


})

router.get('/car/:id' , async (req,res)=>{
try {
    const carid =  new mongoose.Types.ObjectId(req.params.id);
  
    const car = await carschema.findById(carid);
    if(!car){
return res.status(400).json({
    success:false,
    message:'car not found'
})
}
return res.status(200).json({
    success:true,
    car
})

} catch (error) {
    res.status(500).json({
        message:'server error',
        error
    })
    
}
})


router.get('/deshboard', varify, async (req, res) => {
    try {
        console.log("User from auth middleware:", req.user);
        const userid = await req.user._id;
        const usercar = await carschema.find({ ownerid: userid });
       
        res.status(200).json({ success: true, message: 'usercar', usercar: usercar })



    } catch (error) {
        res.status(400).json({ success: false, message: "nul", error: error })
        console.log(error)
    }


})

module.exports = router


