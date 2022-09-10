const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')

const diagnostiqueController = require('../controllers/DiagnostiqueContoller')


Route.post("/Adddiagnostique", passport.authenticate('jwt', { session: false }),upload.single("file"), diagnostiqueController.creatediagnostique)
Route.get("/ALLdiagnostique",passport.authenticate('jwt', { session: false }), diagnostiqueController.getAlldiagnostiques)
Route.get("/getdiagnostiqueByID/:id", passport.authenticate('jwt', { session: false }),diagnostiqueController.getdiagnostiqueById)
Route.delete("/deletediagnostique/:id", passport.authenticate('jwt', { session: false }), diagnostiqueController.deletediagnostiqueById)
Route.put("/updatediagnostique/:id", passport.authenticate('jwt', { session: false }), diagnostiqueController.updatediagnostiqueById)
module.exports = Route;