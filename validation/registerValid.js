
const joi = require("@hapi/joi");
const registerLaboValid = (data) => {

    const schema = joi.object({

        email: joi.string().email().required(),
        password: joi.string().min(6).alphanum().required(),
        name: joi.string().regex(/^[A-Za-z]*$/).required()
            .messages({ "string.pattern.base": "entrez un valid nom" }),
        bio: joi.string().required(),
        adresse: joi.string().required(),
        phoneNumber: joi
            .string()
            .length(8).pattern(/^[0-9]+$/)
            .required()
            .messages({ "string.pattern.base": "entrez un  numero de téléphpne de 8 chiffres" }),

    });

    return schema.validate(data, { abortEarly: false });

};
const registerDoctorValid = (data) => {

    const schema = joi.object({

        email: joi.string().email().required(),
        password: joi.string().min(6).alphanum().required(),
        name: joi.string().regex(/^[A-Za-z]*$/).required()
            .messages({ "string.pattern.base": "entrez un valid nom" }),
        bio: joi.string(),
        adresse: joi.string().required(),
        gender: joi.string().required(),
        education: joi.string().required(),
        specialisation: joi.string().required(),
        phoneNumber: joi
            .string()
            .length(8).pattern(/^[0-9]+$/)
            .required()
            .messages({ "string.pattern.base": "entrez un  numero de téléphpne de 8 chiffres" }),
    });

    return schema.validate(data, { abortEarly: false });

};
const registerPatientValid = (data) => {

    const schema = joi.object({

        email: joi.string().email().required(),
        password: joi.string().min(6).alphanum().required(),
        name: joi.string().regex(/^[A-Za-z]*$/).required()
            .messages({ "string.pattern.base": "entrez un valid nom" }),
        adresse: joi.string().required(),
        gender: joi.string().required(),
        birthDate: joi.string(),
        phoneNumber: joi
            .string()
            .length(8).pattern(/^[0-9]+$/)
            .required()
            .messages({ "string.pattern.base": "entrez un  numero de téléphpne de 8 chiffres" }),
    });

    return schema.validate(data, { abortEarly: false });

};



module.exports = {
    registerDoctorValid,
    registerPatientValid,
    registerLaboValid,

};
