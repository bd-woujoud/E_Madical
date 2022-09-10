const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const dossierMedicalController = require('../controllers/DossierMedicalController')


Route.post("/AdddossierMedical",  dossierMedicalController.createdossierMedical)
Route.get("/ALLdossierMedical",passport.authenticate('jwt', { session: false }), dossierMedicalController.getAlldossierMedicals)
Route.get("/getdossierMedicalByID/:id",passport.authenticate('jwt', { session: false }), dossierMedicalController.getdossierMedicalById)
Route.get("/getdossierMedicalBypatient/:patient", dossierMedicalController.getdossierMedicalByclient)
Route.delete("/deletedossierMedical/:id", passport.authenticate('jwt', { session: false }), dossierMedicalController.deletedossierMedicalById)
Route.put("/updatedossierMedical/:id", dossierMedicalController.updatedossierMedicalById)
module.exports = Route;