const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const LaboController = require('../controllers/LaboController')

Route.post("/register", LaboController.register)

Route.get('/allLabo', LaboController.getAllLabos)
Route.get('/getLabobyid/:id', passport.authenticate('jwt', { session: false }), LaboController.getLaboById)
Route.get('/getLabobyrole/:role', LaboController.getLabobyRole)
Route.delete('/deleteLabobyid/:id',  LaboController.deleteLaboById)
Route.put('/avatar/:id', LaboController.uploadavatar);
Route.put('/updateLabo/:id', LaboController.updateLAboById);
Route.get("/getme", passport.authenticate('jwt', { session: false }), LaboController.getme)




module.exports = Route;