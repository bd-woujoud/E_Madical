const doctorModel = require('../models/DoctorModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { registerDoctorValid } = require('../validation/registerValid');
require('../passportConfig');
require('dotenv').config();

function signToken(doctorID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: doctorID
    }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

}
module.exports = {

    // register: (req, res) => {
    //     const { email, password, role } = req.body;

    //     doctorModel.findOne({ email }, function (err, doctor) {
    //         if (err)
    //             return res.status(500).json({ msg: err.message, error: true })
    //         if (doctor)
    //             return res.status(400).json({ msg: "doctor already exist", error: true })
    //         else {
    //             const newdoctor = new doctorModel(req.body)

    //             newdoctor.save((err, doctor) => {
    //                 if (err)
    //                     return res.status(500).json({ msg: err.message, error: true })
    //                 else {
    //                     const token = signToken(doctor.id);
    //                     //httpOnly prevents XSS (read in my authentication doc for more info)
    //                     res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

    //                     return res.status(200).json({ isAuthenticated: true, doctor: { email, role }, error: false })
    //                 }
    //             })
    //         }
    //     })
    // },
    register: async (req, res) => {

        const { email, password ,role} = req.body;
        const { error } =registerDoctorValid(req.body);

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })

        else {

            doctorModel.findOne({ email }, function (err, user) {

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

                    const newdoctor = new doctorModel(req.body)

                    newdoctor.save((err, doctor) => {
                        if (err)
                            return res.status(500).json({ msg: err.message, error: true })
                        else {
                            const token = signToken(doctor.id);
                            //httpOnly prevents XSS (read in my authentication doc for more info)
                            res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

                            return res.status(200).json({ isAuthenticated: true, doctor: { email, role }, error: false })
                        }
                    })
                }

            })
    }
    },




    updateDocteurById: async function (req, res) {

        const passwordhash = await bcrypt.hash(req.body.password, 10) // cryptage password 

        req.body.password = passwordhash

        doctorModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {

            if (err) {
                res.json({
                    message: "error update  user by id " + err,
                    data: null,
                    status: 500,
                });
            } else {
                res.json({
                    message: "Docteur updated successufly",
                    data: user,
                    status: 200,
                });
            }
        }
        );
    },


    getAlldoctors: function (req, res) {

        doctorModel.find({}, (err, doctors) => {
            if (err) {
                res.json({ message: 'error get all doctors' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all doctors in system', size: doctors.length, data: doctors, status: 200 })

            }
        })

    },

    getdoctorById: function (req, res) {

        doctorModel.findById({ _id: req.params.id })

            .exec((err, doctor) => {
                if (err) {
                    res.json({ message: 'error get one doctor' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' doctor in system', data: doctor, status: 200 })


                }
            })
    },

    getdoctorbyRole: function (req, res) {

        doctorModel.find({ role: req.params.role }, (err, doctor) => {
            if (err) {
                res.json({ message: 'error get one doctor' + err, data: null, status: 500 })
            } else {
                res.json({ message: ' doctors in system', data: doctor, status: 200 })
            }
        })
    },


    deletedoctorById: function (req, res) {

        doctorModel.findByIdAndDelete({ _id: req.params.id }, (err, doctor) => {

            if (err) { res.json({ message: 'error delete  one doctor' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one doctor delete system', data: doctor, status: 200 }) }

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
            doctorModel.findByIdAndUpdate({ _id: req.params.id }, avatar, (err, doctor) => {
                if (err) {
                    res.status(500).json({ message: "avatar not uploaded" });
                } else {
                    doctorModel.findById({ _id: doctor.id }, (err, doctor) => {
                        if (err) {
                            res.json("error");
                        } else {
                            res.status(200).json({
                                message: "doctor updated",
                                data: doctor,
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

    /*doctorModel.findByIdAndUpdate({ _id: req.params.id }, avatar,{ new: true }, (err, doctor) => {
            if (err) {
                res.status(500).json({ message: "avatar not uploaded" });
            } else {
                doctorModel.findById({ _id: doctor.id }, (err, doctor) => {
                    if (err) {
                        res.json("error");
                    } else {
                        if (avatar.mimetype!=='image/jpg') {
                            res.json('please enter a valid extention')
                        }
                        else{
                        res.status(200).json({
                            message: "doctor updated",
                            data: doctor,
                        });
                    }
                }});
            }
        });*/

    getme: (req, res) => {

        doctorModel.findById({ _id: req.doctor._id }, (err, doctor) => {


            if (err) {
                res.status(500).json({
                    message: 'no doctordetails',
                    data: null,

                })
                console.log('reqsdoctor', req.doctor)
            } else {
                res.status(200).json({
                    message: 'doctordetails',
                    data: doctor,


                })
                console.log('reqsdoctor', req.doctor)
            }
        })
    }

}


