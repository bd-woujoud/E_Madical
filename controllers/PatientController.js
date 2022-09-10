const patientModel = require('../models/PatientModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { registerPatientValid } = require('../validation/registerValid');
require('../passportConfig');
require('dotenv').config();

function signToken(patientID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: patientID
    }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

}

module.exports = {

    register: async (req, res) => {

        const { email, password ,role} = req.body;
        const { error } = registerPatientValid(req.body);

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })

        else  {

            patientModel.findOne({ email }, function (err, user) {

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

                    const newpatient = new patientModel(req.body)

                    newpatient.save((err, patient) => {
                        if (err)
                            return res.status(500).json({ msg: err.message, error: true })
                        else {
                            const token = signToken(patient.id);
                            //httpOnly prevents XSS (read in my authentication doc for more info)
                            res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });
                            return res.status(200).json({ isAuthenticated: true, patient: { email, role }, error: false })
                        }
                    })
                }

            })
    }
    },

    
    getAllpatients: function (req, res) {

        patientModel.find({}, (err, patients) => {
            if (err) {
                res.json({ message: 'error get all patients' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all patients in system', size: patients.length, data: patients, status: 200 })

            }
        })

    },

    getpatientById: function (req, res) {

        patientModel.findById({ _id: req.params.id })

            .exec((err, patient) => {
                if (err) {
                    res.json({ message: 'error get one patient' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' patient in system', data: patient, status: 200 })
                }
            })
    },

    getPatientByDoctor: function (req, res) {

        patientModel.find({doctor:req.params.id}).exec((err,appointment)=> {

            if (err) {
                
                res.json({ message: 'error get appointment by doctor' + err, data: null, status: 500 })
            }

            else {
                
                res.json({ message: 'appointment by doctor', data: appointment, status: 200 })
            }
        })
    },


    
// pushdoctor: async (req, res) => {

//     try { 
       
//       const result = await patientModel.updateOne( { _id: req.params.id }, { $push: { doctor: req.body.doctor }});
      
//       res.json({message:'doctor pushed', data:result,status:200});

//     }

//     catch (error) {
//       console.log(error.message);
//       res.json({message:'error', data:null,status:500});
//     }
//   },


    deletepatientById: function (req, res) {

        patientModel.findByIdAndDelete({ _id: req.params.id }, (err, patient) => {

            if (err) { res.json({ message: 'error delete  one patient' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one patient delete system', data: patient, status: 200 }) }

        })

    },

    updatePatientById: async function (req, res) {
    
        patientModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true },function (err, user) {
          
            if (err) {
              res.json({
                message: "error update  user by id " + err,
                data: null,
                status: 500,
              });
            } else {
              res.json({
                message: "Patient updated successufly",
                data: req.body,
                status: 200,
              });
            }
          }
        );
      },
    
    uploadavatar: (req, res) => {
        //let avatar= req.file.filename;
        const avatar = {
            avatar: req.file.filename, //  filename: Le nom du fichier dans le destination
        };
        console.log('fiiiiiiilllleee', req.file);
        //console.log('params', req.params);

        if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/png') {
            patientModel.findByIdAndUpdate({ _id: req.params.id }, avatar, (err, patient) => {
                if (err) {
                    res.status(500).json({ message: "avatar not uploaded" });
                } else {
                    patientModel.findById({ _id: patient.id }, (err, patient) => {
                        if (err) {
                            res.json("error");
                        } else {
                            res.status(200).json({
                                message: "patient updated",
                                data: patient,
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

        patientModel.findById({ _id: req.patient._id }, (err, patient) => {


            if (err) {
                res.status(500).json({
                    message: 'no patientdetails',
                    data: null,

                })
                console.log('reqspatient', req.patient)
            } else {
                res.status(200).json({
                    message: 'patientdetails',
                    data: patient,


                })
                console.log('reqspatient', req.patient)
            }
        })
    }

}


