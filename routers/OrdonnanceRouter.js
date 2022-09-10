const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')

const ordonnanceController = require('../controllers/OrdonnanceMedicalController')


Route.post("/Addordonnance", upload.single("ordonnancefile"), ordonnanceController.createOrdonnance)
Route.get("/ALLordonnance", ordonnanceController.getAllordonnances)
Route.get("/getordonnanceByID/:id", ordonnanceController.getordonnanceById)
Route.delete("/deleteordonnance/:id", passport.authenticate('jwt', { session: false }), ordonnanceController.deleteordonnanceById)
Route.put("/updateordonnance/:id", passport.authenticate('jwt', { session: false }), ordonnanceController.updateordonnanceById)
module.exports = Route;