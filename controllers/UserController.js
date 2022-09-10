const userModel = require('../models/UserModel')
const jwt = require('jsonwebtoken');
require('dotenv').config();
function signToken(userID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID
    }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

}
module.exports = {


    login: (req, res) => {
        const { _id, email } = req.user;
        userModel.findById({ _id: _id })

            .exec((err, user) => {
                if (!err) {
                    const token = signToken(_id);

                    res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

                    return res.status(200).json({ isAuthenticated: true, user: { email}, role: req.user.__t })

                }
            })
    },


    logout: (req, res) => {


        res.clearCookie("access_token");
        return res.status(200).json({ success: true, user: { email: "" }, role: "" })
    },

    protectedData: (req, res) => {
        return res.status(200).json({ data: "Protected data...hehehe" })
    },


    AdminprotectedData: (req, res) => {
        const { role } = req.user;
        if (role === "admin")
            return res.status(200).json({ data: "Admin Protected data...hehehe" })
        return res.status(403).json({ data: "" })
    },


    authenticated: (req, res) => {
        const { email, name, avatar, _id,phoneNumber,adresse,password} = req.user;
        userModel.findById({ _id: _id })
            .exec((err, user) => {
                if (!err) {
                    return res.status(200).json({ isAuthenticated: true, user: { email, name, avatar,_id,phoneNumber,adresse,password}, role: user.__t })
                }
            })
},


    getAllUsers: function (req, res) {

        userModel.find({}, (err, users) => {
            if (err) {
                res.json({ message: 'error get all users' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all users in system', size: users.length, data: users, status: 200 })

            }
        })

    },

    getUserById: function (req, res) {

        userModel.findById({ _id: req.params.id })

            .exec((err, user) => {
                if (err) {
                    res.json({ message: 'error get one user' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' user in system', data: user, status: 200 })


                }
            })
    },

    getUserbyRole: function (req, res) {

        userModel.find({ role: req.params.role }, (err, User) => {
            if (err) {
                res.json({ message: 'error get one User' + err, data: null, status: 500 })
            } else {
                res.json({ message: ' Users in system', data: User, status: 200 })
            }
        })
    },


    deleteUserById: function (req, res) {

        userModel.findByIdAndDelete({ _id: req.params.id }, (err, User) => {

            if (err) { res.json({ message: 'error delete  one User' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one User delete system', data: User, status: 200 }) }

        })

    },

    uploadavatar: (req, res) => {
        //let avatar= req.file.filename;
        const avatar = {
            avatar: req.file.filename, //  filename: Le nom du fichier dans le destination
        };
        console.log('fiiiiiiilllleee', req.file);
        //console.log('params', req.params);

        if ( req.file.mimetype == "image/jpg" ||req.file.mimetype == "image/png" ||req.file.mimetype == "image/jpeg") {
            userModel.findByIdAndUpdate({ _id: req.params.id }, avatar, (err, user) => {
                if (err) {
                    res.status(500).json({ message: "avatar not uploaded" });
                } else {
                    userModel.findById({ _id: user.id }, (err, user) => {
                        if (err) {
                            res.json("error");
                        } else {
                            res.status(200).json({
                                message: "user updated",
                                data: user,
                            });
                        }
                    });
                }
            });
        }
        else {
            res.json({ msg: 'please enter a valid extention' })
        }
    },
    getme: (req, res) => {

        userModel.findById({ _id: req.user._id }, (err, user) => {


            if (err) {
                res.status(500).json({
                    message: 'no userdetails',
                    data: null,

                })
                console.log('reqsuser', req.user)
            } else {
                res.status(200).json({
                    message: 'userdetails',
                    data: user,


                })
                console.log('reqsuser', req.user)
            }
        })
    }

}


