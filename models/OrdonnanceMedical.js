
const mongoose = require("mongoose");
const OrdonnanceSchema = new mongoose.Schema(

  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
     description: {
      type: String,
      required: true
    }, 
    ordonnancefile: {
      type: String,
      required: true
  },
  },

  { timestamps: true }

);

module.exports = mongoose.model("Ordonnance", OrdonnanceSchema);
