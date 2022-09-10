const appointmentModel = require('../models/AppointmentModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');

module.exports = {

    createappointment: function (req, res) {

        appointmentModel.create(req.body, (err, appointment) => {
            if (err) {
                res.json({ message: 'error create appointment' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'appointment created ', data: appointment, status: 200 })

            }
        })
    },

    getAllappointments: function (req, res) {
        appointmentModel.find({}).populate('userId').exec((err, appointments) => {
            if (err) {
                res.json({ message: 'error get all appointments' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all appointments in system', size: appointments.length, data: appointments, status: 200 })

            }
        })
    },

    getappointmentById: function (req, res) {
        appointmentModel.findById({ _id: req.params.id })
            .exec((err, appointment) => {
                if (err) {
                    res.json({ message: 'error get one appointment' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' appointment in system', data: appointment, status: 200 })
                }
            })
    },


    getappointmentByPatient: function (req, res) {

        appointmentModel.find({patient:req.params.id}).populate('doctor').exec((err,appointment)=> {

            if (err) {

                res.json({ message: 'error get appointment by id ' + err, data: null, status: 500 })
            }

            else {

                res.json({ message: 'appointment by patient id exist ', data: appointment, status: 200 })
            }

        })
    },

    getappointmentByDoctor: function (req, res) {

        appointmentModel.find({doctor:req.params.id}).populate('patient').exec((err,appointment)=> {

            if (err) {

                res.json({ message: 'error get appointment by doctor' + err, data: null, status: 500 })
            }
            else {
                
                res.json({ message: 'appointment by doctor', data: appointment, status: 200 })
            }

        })
    },
   

    getappointmentConfirmedByPatient: function (req, res) {

        appointmentModel.find({isConfirmed:true,patient:req.params.id}).populate("doctor").exec((err,appointment)=> {

            if (err) {

                res.json({ message: 'error get appointment by id ' + err, data: null, status: 500 })

            }

            else {
                
                res.json({ message: 'appointment by patient id exist ', data: appointment, status: 200 })
            }

        })
    },

    getappointmentConfirmedByDoctor: function (req, res) {

        appointmentModel.find({isConfirmed:true,doctor:req.params.id}).populate('patient').exec((err,appointment)=> {

            if (err) {

                res.json({ message: 'error get appointment by id ' + err, data: null, status: 500 })

            }

            else {
                
                res.json({ message: 'appointment by doctor id exist ', data: appointment, status: 200 })
            }

        })
    },

  



    deleteappointmentById: function (req, res) {

        appointmentModel.findByIdAndDelete({ _id: req.params.id })
            .exec((err, appointment) => {

                if (err) {
                    res.json({ message: 'error delete  one appointment' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: 'one appointment delete system', data: appointment, status: 200 })
                }
            })

    },

    updateappointmentById: (req, res) => {
        appointmentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, appointment) => {
            if (err) {
                res.status(500).json({
                    message: "appointment not updated ",
                    data: null,
                });
            } else {
                res.status(200).json({
                    message: "appointment updated successfuly ",
                    data: req.body,
                });
            }
        });
    },
}