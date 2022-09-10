const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const appointmentController = require('../controllers/AppointmentController')

Route.post("/Addappointment", appointmentController.createappointment)
Route.get("/ALLappointment",appointmentController.getAllappointments)
Route.get("/getappointmentByID/:id",appointmentController.getappointmentById)

Route.get("/getappointmentBypatient/:id",appointmentController.getappointmentByPatient)
Route.get("/getappointmentBydoctor/:id",appointmentController.getappointmentByDoctor)
Route.get("/getappointmentConfirmed/:id",appointmentController.getappointmentConfirmedByPatient)
Route.get("/getappointmentConfirmedDoctor/:id",appointmentController.getappointmentConfirmedByDoctor)
Route.delete("/deleteappointment/:id", appointmentController.deleteappointmentById)
Route.put("/updateappointment/:id", appointmentController.updateappointmentById)
module.exports = Route;



