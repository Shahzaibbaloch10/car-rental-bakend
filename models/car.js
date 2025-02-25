

const mongoodb = require('mongoose');


const carschema = new mongoodb.Schema ({
    ownerid:{ type: mongoodb.Schema.Types.ObjectId, ref: "users",required: true },
brand: {type:String,required:true},
carmodel:{type:String,required:true},
year:{type:Number , required:true},
type:{type:String , required:true},
address:{type:String, required:true},
price:{type:String , required: true},
available: { type: Boolean, default: true },
images: { type: [String], required: true } 
},{timestamps:true})


const carmodel = mongoodb.model('cars',carschema);
module.exports= carmodel;
