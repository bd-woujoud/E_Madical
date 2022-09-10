const mongoose=require('mongoose')
const userModel = require('./userModel')
const Schema = mongoose.Schema

const emailSchema =new Schema({

    labos: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Labos'
    },
    message:{

        type:String,
        required:true
    },
    doctor:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },

},

{timestamps:true})

module.exports=mongoose.model('email',emailSchema) 