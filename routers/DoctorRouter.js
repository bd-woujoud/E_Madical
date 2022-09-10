const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const doctorController = require('../controllers/DoctorController')

Route.post("/register", doctorController.register)

Route.get('/alldoctor', doctorController.getAlldoctors)
Route.get('/getdoctorbyid/:id', doctorController.getdoctorById)
Route.get('/getdoctorbyrole/:role', doctorController.getdoctorbyRole)
Route.delete('/deletedoctorbyid/:id',  doctorController.deletedoctorById)
Route.put('/avatar/:id', upload.single("avatar"), doctorController.uploadavatar);
Route.put('/updateDocteur/:id', doctorController.updateDocteurById);
Route.get("/getme", doctorController.getme)




module.exports = Route;