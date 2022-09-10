const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const analyseController = require('../controllers/AnalyseController')
Route.post("/Addanalyse", upload.single("file"),analyseController.createanalyse)
Route.get("/ALLanalyse", analyseController.getAllanalyses)
Route.get("/getanalyseByID/:id", analyseController.getanalyseById)
Route.delete("/deleteanalyse/:id", passport.authenticate('jwt', { session: false }), analyseController.deleteanalyseById)
Route.put("/updateanalyse/:id", passport.authenticate('jwt', { session: false }), analyseController.updateanalyseById)
module.exports = Route;