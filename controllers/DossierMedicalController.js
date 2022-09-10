const dossierMedicalModel = require('../models/DossierMedicalModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
//const ValidatedossierMedical = require('../validation/dossierMedicalValid')
module.exports = {

    createdossierMedical: function (req, res) {

        dossierMedicalModel.create(req.body, (err, dossierMedical) => {
            if (err) {
                res.json({ message: 'error create dossierMedical' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'dossierMedical created ', data: dossierMedical, status: 200 })

            }
        })
    },
    getAlldossierMedicals: function (req, res) {
        dossierMedicalModel.find({}).populate('patient').exec((err, dossierMedicals) => {
            if (err) {
                res.json({ message: 'error get all dossierMedicals' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all dossierMedicals in system', size: dossierMedicals.length, data: dossierMedicals, status: 200 })

            }
        })
    },
    getdossierMedicalById: function (req, res) {
        dossierMedicalModel.findById({ _id: req.params.id })
        .populate('patient').exec((err, dossierMedical) => {
                if (err) {
                    res.json({ message: 'error get one dossierMedical' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' dossierMedical in system', data: dossierMedical, status: 200 })


                }
            })
    },
    getdossierMedicalByclient: function (req, res) {
        dossierMedicalModel.find({ patient: req.params.patient })
        .populate('patient').exec((err, dossierMedical) => {
                if (err) {
                    res.json({ message: 'error get one dossierMedical' + err, data:null, status: 500 })
                }
                else {
                    res.json({ message: ' dossierMedical in system', data: dossierMedical, status: 200 })


                }
            })
    },
    deletedossierMedicalById: function (req, res) {
        dossierMedicalModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, dossierMedical) => {

                if (err) {
                    res.json({ message: 'error delete  one dossierMedical' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one dossierMedical delete system', data: dossierMedical, status: 200 })
                }
            })
    },
    updatedossierMedicalById: (req, res) => {
        dossierMedicalModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, dossierMedical) => {
            if (err) {
                res.status(500).json({
                    message: "dossierMedical not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "dossierMedical updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
}