const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./UserModel')


const patientschema = new mongoose.Schema({

    birthDate: {
        type: Date,
    },
 
    gender: {
        enum: ["Male", "Femelle"],
        type:String
    },

// doctor:[{

//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Doctor",
    
// }]
}
,
{timestamps:true})



module.exports = userModel.discriminator('Patient', patientschema);