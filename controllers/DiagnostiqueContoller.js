const diagnostiqueModel = require('../models/DiagnostiqueModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
//const Validatediagnostique = require('../validation/diagnostiqueValid')
module.exports = {
    creatediagnostique: function (req, res) {
        
        diagnostiqueModel.create({
            userId: req.body.userId,
            description: req.body.description,
            file: req.file.filename

        },
            function (err, diagnostique) {
                if (err) {
                    res.json({ message: 'error create diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'diagnostique created ', data: diagnostique, status: 200 })

                }
            })


    },
    getAlldiagnostiques: function (req, res) {
        diagnostiqueModel.find({}).populate('userId').exec((err, diagnostiques) => {
            if (err) {
                res.json({ message: 'error get all diagnostiques' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all diagnostiques in system', size: diagnostiques.length, data: diagnostiques, status: 200 })

            }
        })
    },
    getdiagnostiqueById: function (req, res) {
        diagnostiqueModel.findById({ _id: req.params.id })
            .exec((err, diagnostique) => {
                if (err) {
                    res.json({ message: 'error get one diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' diagnostique in system', data: diagnostique, status: 200 })


                }
            })
    },
    deletediagnostiqueById: function (req, res) {
        diagnostiqueModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, diagnostique) => {

                if (err) {
                    res.json({ message: 'error delete  one diagnostique' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one diagnostique delete system', data: diagnostique, status: 200 })
                }
            })
    },
    updatediagnostiqueById: (req, res) => {
        diagnostiqueModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, diagnostique) => {
            if (err) {
                res.status(500).json({
                    message: "diagnostique not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "diagnostique updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
}