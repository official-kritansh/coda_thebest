var mongoose=require("mongoose"),
    shortid=require("shortid");


var hackerSchema=new mongoose.Schema({
    hid:{type:String,default:shortid.generate},
    name:{type:String},
    challangesSolved:{type:Number,default:0},
    expertiseLevel:{type:Number,default:1},
    expertIn:{
        dataStructure:{type:Number,default:1},
        java:{type:Number,default:1},
        c:{type:Number,default:1},
        python:{type:Number,default:1}
    },
    votes:{type:Number,default:0}
});

module.exports=mongoose.model("Hacker",hackerSchema);