const analyseModel = require('../models/AnalyseModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
//const Validateanalyse = require('../validation/analyseValid')
module.exports = {

    createanalyse: function (req, res) {
        analyseModel.create({
                userId: req.body.userId,
                payed: req.body.payed,
                file: req.file.filename

            },
                function (err, analyse) {
                    if (err) {
                        res.json({ message: 'error create analyse' + err, data: null, status: 500 })
                    }
                    else {
                        res.json({ message: 'analyse created ', data: analyse, status: 200 })
        
                    }
                })

        
            },
    getAllanalyses: function (req, res) {
        analyseModel.find({}).populate('userId').exec((err, analyses) => {
            if (err) {
                res.json({ message: 'error get all analyses' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all analyses in system', size: analyses.length, data: analyses, status: 200 })

            }
        })
    },
    getanalyseById: function (req, res) {
        analyseModel.findById({ _id: req.params.id })
            .exec((err, analyse) => {
                if (err) {
                    res.json({ message: 'error get one analyse' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' analyse in system', data: analyse, status: 200 })


                }
            })
    },
    deleteanalyseById: function (req, res) {
        analyseModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, analyse) => {

                if (err) {
                    res.json({ message: 'error delete  one analyse' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one analyse delete system', data: analyse, status: 200 })
                }
            })
    },
    updateanalyseById: (req, res) => {
        analyseModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, analyse) => {
            if (err) {
                res.status(500).json({
                    message: "analyse not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "analyse updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
}