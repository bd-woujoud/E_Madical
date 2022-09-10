
const mongoose = require("mongoose");
const AnalyseSchema = new mongoose.Schema(

  {
    labo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Labo",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    file: {
      type: String,
      required: true
    },
    payed:
    {
        type: Boolean,
        required: true
      },
  
  },

  { timestamps: true }

);

module.exports = mongoose.model("Analyse", AnalyseSchema);
