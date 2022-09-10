const mongoose = require('mongoose');
const userModel = require('./UserModel')

const doctorSchema = new mongoose.Schema({
    gender: {
        enum: ["Male", "Femelle"],
        type:String
    },
   
      education: {
        type: String,
      },
      specialisation: {
        type: String,
      },
      bio: {
        type: String,
      }

},
{timestamps:true})





module.exports = userModel.discriminator('Doctor', doctorSchema);