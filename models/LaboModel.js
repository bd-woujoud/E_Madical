const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const userModel = require('./UserModel')


const laboSchema = new mongoose.Schema({

},
{timestamps:true})



module.exports = userModel.discriminator('Labo', laboSchema);