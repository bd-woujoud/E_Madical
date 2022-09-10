const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const patientController = require('../controllers/PatientController')

Route.post("/register", patientController.register)

Route.get('/allpatient', patientController.getAllpatients)
Route.get('/getpatientbyid/:id', passport.authenticate('jwt', { session: false }), patientController.getpatientById)
Route.get('/getpatientbydoctor/:id',  patientController.getPatientByDoctor)
Route.delete('/deletepatientbyid/:id',  patientController.deletepatientById)
Route.put('/avatar/:id', patientController.uploadavatar);
Route.put('/updatePatient/:id',  patientController.updatePatientById);
Route.get("/getme", passport.authenticate('jwt', { session: false }), patientController.getme)
// Route.put('/pushdoctor/:id',patientController.pushdoctor)




module.exports = Route;