const ordonnanceModel = require('../models/OrdonnanceMedical')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
//const Validateordonnance = require('../validation/ordonnanceValid')
module.exports = {

    createOrdonnance: function (req, res) {
        console.log("file", req.file)
        ordonnanceModel.create({
                userId: req.body.userId,
                description: req.body.description,
                ordonnancefile: req.file.filename
            },
                function (err, ordonnance) {
                    if (err) {
                        res.json({ message: 'error create ordonnance' + err, data: null, status: 500 })
                    }
                    else {
                        res.json({ message: 'ordonnance created ', data: ordonnance, status: 200 })
        
                    }
                })

        
            },
    getAllordonnances: function (req, res) {
        ordonnanceModel.find({}).populate('userId').exec((err, ordonnances) => {
            if (err) {
                res.json({ message: 'error get all ordonnances' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all ordonnances in system', size: ordonnances.length, data: ordonnances, status: 200 })

            }
        })
    },
    
    getordonnanceById: function (req, res) {
        ordonnanceModel.findById({ _id: req.params.id })
            .exec((err, ordonnance) => {
                if (err) {
                    res.json({ message: 'error get one ordonnance' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' ordonnance in system', data: ordonnance, status: 200 })


                }
            })
    },

    deleteordonnanceById: function (req, res) {
        ordonnanceModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, ordonnance) => {

                if (err) {
                    res.json({ message: 'error delete  one ordonnance' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one ordonnance delete system', data: ordonnance, status: 200 })
                }
            })
    },
    updateordonnanceById: (req, res) => {
        ordonnanceModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, ordonnance) => {
            if (err) {
                res.status(500).json({
                    message: "ordonnance not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "ordonnance updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
}