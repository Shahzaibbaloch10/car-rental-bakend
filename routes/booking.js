const express = require('express');
const router = express.Router();
const booingvalidation = require('../middlewear/bookingvalidation');
const varify = require('../middlewear/varify');
const { default: mongoose } = require('mongoose');
const carschema = require('../models/car');
const bookingmodel = require('../models/book');

router.post('/booking/:id', varify, booingvalidation, async (req, res) => {
    try {
        console.log('userid', req.user)
        const { pickupdate, dropdate, pickuptime, droptime, location } = req.body;
        const userid = await req.user._id;
        const carid = new mongoose.Types.ObjectId(req.params.id)
        const car = await carschema.findById(carid)
        if (!car) {
            return res.status(400).json({
                message: 'id not found'
            })
        }

        const ownerid = car.ownerid;
        if (!ownerid || !carid || !userid) {
            return res.status(400).json({
                message: 'id not found'
            })
        }
        const booking = new bookingmodel({
            ownerid, userid: userid, carid, pickupdate, pickuptime, dropdate, droptime, location

        })
        console.log(booking)
        await booking.save()
        return res.status(200).json({
            success: true,
            messsage: 'booking success',

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server error'
            , error: error
        })


    }

})


router.get('/bookings' ,varify,async(req,res)=>{
try{
const ownerid=  req.user._id;
console.log("Owner ID:", ownerid);

const booking = await bookingmodel.findOne({ownerid: ownerid})
.populate('userid carid')
// .populate('carid' ,"carmodel brand");

if(!booking){
    console.log('booking not found')
}
res.status(200).json({
    success:true,
    booking
})




}catch(error){
    console.log(error)
    res.status(500).json({ success: false, message: "Server error", error });
}


})


router.put('/booking/:bookingid' ,async(req,res)=>{
try {
    const bookingid = req.params.bookingid;
    const { status } = req.body;
const bookingstatus= await bookingmodel.findById(bookingid);
if(!bookingstatus){
    res.status(400).json({
        message:"id dont found"
    })
}
bookingstatus.status= status;
await bookingstatus.save()

res.status(200).json({ success: true, message: `Booking ${status} successfully!`, bookingstatus });

} catch (error) {
    
res.status(500).json({
    success:false,

    message:"internal server error"
})

}



})

router.get('/mybooking' ,varify ,async(req,res)=>{
try {
    const userid = req.user.id;
    const mybooking= await bookingmodel.find(userid).populate('carid')
    if(!mybooking){
        res.status(400).json({
            success:false,
            message:'you dont book ha any car'
        })
    }
    res.status(200).json({
        success:true,
        mybooking
    })

} catch (error) {
    
res.status(500).json({
    success:false,
    message:'internal server error'
})

}


} )

module.exports = router;