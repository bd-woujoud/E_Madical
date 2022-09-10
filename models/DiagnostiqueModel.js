
const mongoose = require("mongoose");
const DiagnostiqueSchema = new mongoose.Schema(

  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },

  { timestamps: true }

);

module.exports = mongoose.model("Diagnostique", DiagnostiqueSchema);
