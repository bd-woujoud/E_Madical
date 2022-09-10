const LaboModel = require('../models/LaboModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { registerLaboValid } = require('../validation/registerValid');
require('../passportConfig');
require('dotenv').config();

function signToken(LaboID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: LaboID
    }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

}
module.exports = {

    // register: (req, res) => {
    //     const { email, password, role } = req.body;

    //     LaboModel.findOne({ email }, function (err, Labo) {
    //         if (err)
    //             return res.status(500).json({ msg: err.message, error: true })
    //         if (Labo)
    //             return res.status(400).json({ msg: "Labo already exist", error: true })
    //         else {
    //             const newLabo = new LaboModel(req.body)

    //             newLabo.save((err, Labo) => {
    //                 if (err)
    //                     return res.status(500).json({ msg: err.message, error: true })
    //                 else {
    //                     const token = signToken(Labo.id);
    //                     //httpOnly prevents XSS (read in my authentication doc for more info)
    //                     res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

    //                     return res.status(200).json({ isAuthenticated: true, Labo: { email, role }, error: false })
    //                 }
    //             })
    //         }
    //     })
    // },
    
    register: async (req, res) => {

        const { email, password ,role } = req.body;
        const { error } = registerLaboValid(req.body);

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })

        else {

            LaboModel.findOne({ email }, function (err, user) {

                if (err) return res.status(500).json({ msg: err.message, error: true });
                if (user)
                    return res.status(422).json({
                        message: "user with this email is already exist!",
                        errors: {
                            details: [
                                {

                                    "path": [
                                        "email"
                                    ],
                                    "message": [
                                        "email déja utilisé"
                                    ]
                                }
                            ]
                        }
                    })


                else {

                    const newLabo = new LaboModel(req.body)

                    newLabo.save((err, Labo) => {
                        if (err)
                            return res.status(500).json({ msg: err.message, error: true })
                        else {
                            const token = signToken(Labo.id);
                            //httpOnly prevents XSS (read in my authentication doc for more info)
                            res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

                            return res.status(200).json({ isAuthenticated: true, Labo: { email, role }, error: false })
                        }
                    })
                }

            })
    }
    },

    
    getAllLabos: function (req, res) {

        LaboModel.find({}, (err, Labos) => {
            if (err) {
                res.json({ message: 'error get all Labos' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all Labos in system', size: Labos.length, data: Labos, status: 200 })

            }
        })

    },

    getLaboById: function (req, res) {

        LaboModel.findById({ _id: req.params.id })

            .exec((err, Labo) => {
                if (err) {
                    res.json({ message: 'error get one Labo' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' Labo in system', data: Labo, status: 200 })


                }
            })
    },
    
    updateLAboById: async function (req, res) {

        const passwordhash = await bcrypt.hash(req.body.password, 10) // cryptage password 
    
             req.body.password = passwordhash
    
             LaboModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true },function (err, user) {
          
            if (err) {
              res.json({
                message: "error update  user by id " + err,
                data: null,
                status: 500,
              });
            } else {
              res.json({
                message: "Labo updated successufly",
                data: user,
                status: 200,
              });
            }
          }
        );
      },
    
    getLabobyRole: function (req, res) {

        LaboModel.find({ role: req.params.role }, (err, Labo) => {
            if (err) {
                res.json({ message: 'error get one Labo' + err, data: null, status: 500 })
            } else {
                res.json({ message: ' Labos in system', data: Labo, status: 200 })
            }
        })
    },


    deleteLaboById: function (req, res) {

        LaboModel.findByIdAndDelete({ _id: req.params.id }, (err, Labo) => {

            if (err) { res.json({ message: 'error delete  one Labo' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one Labo delete system', data: Labo, status: 200 }) }

        })

    },


    uploadavatar: (req, res) => {
        //let avatar= req.file.filename;
        const avatar = {
            avatar: req.file.filename, //  filename: Le nom du fichier dans le destination
        };
        console.log('fiiiiiiilllleee', req.file);
        //console.log('params', req.params);

        if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/png') {
            LaboModel.findByIdAndUpdate({ _id: req.params.id }, avatar, (err, Labo) => {
                if (err) {
                    res.status(500).json({ message: "avatar not uploaded" });
                } else {
                    LaboModel.findById({ _id: Labo.id }, (err, Labo) => {
                        if (err) {
                            res.json("error");
                        } else {
                            res.status(200).json({
                                message: "Labo updated",
                                data: Labo,
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

    /*LaboModel.findByIdAndUpdate({ _id: req.params.id }, avatar,{ new: true }, (err, Labo) => {
            if (err) {
                res.status(500).json({ message: "avatar not uploaded" });
            } else {
                LaboModel.findById({ _id: Labo.id }, (err, Labo) => {
                    if (err) {
                        res.json("error");
                    } else {
                        if (avatar.mimetype!=='image/jpg') {
                            res.json('please enter a valid extention')
                        }
                        else{
                        res.status(200).json({
                            message: "Labo updated",
                            data: Labo,
                        });
                    }
                }});
            }
        });*/

    getme: (req, res) => {

        LaboModel.findById({ _id: req.Labo._id }, (err, Labo) => {


            if (err) {
                res.status(500).json({
                    message: 'no Labodetails',
                    data: null,

                })
                console.log('reqsLabo', req.Labo)
            } else {
                res.status(200).json({
                    message: 'Labodetails',
                    data: Labo,


                })
                console.log('reqsLabo', req.Labo)
            }
        })
    }

}


