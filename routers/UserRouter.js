const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const userController = require('../controllers/UserController')

// Route.post("/register", userController.register)
Route.post("/login", passport.authenticate('local', { session: false }), userController.login)

Route.get("/logout", passport.authenticate('jwt', { session: false }), userController.logout)
Route.get('/allUser', userController.getAllUsers)
Route.get('/getUserbyid/:id', passport.authenticate('jwt', { session: false }), userController.getUserById)
Route.get('/getUserbyrole/:role', userController.getUserbyRole)
Route.delete('/deleteUserbyid/:id',  userController.deleteUserById)
Route.put('/avatar/:id', upload.single("avatar"), userController.uploadavatar);
//Admin et utilisateur normal peuvent accéder
Route.get("/protectedData", passport.authenticate('jwt', { session: false }), userController.protectedData)
//seul l’administrateur peut accéder
Route.get("/admin/protectedData", passport.authenticate('jwt', { session: false }), userController.AdminprotectedData)


//Vérifiez le statut d’authentification chaque fois que l’application front-end rafraîchit
Route.get("/authenticated", passport.authenticate('jwt', { session: false }), userController.authenticated)
Route.get("/getme", passport.authenticate('jwt', { session: false }), userController.getme)




module.exports = Route;