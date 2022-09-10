
const joi = require("@hapi/joi");
const loginValid = (data) => {

  const schema = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(6).alphanum().required(),


  });

  return schema.validate(data, { abortEarly: false });

};



module.exports = {
  loginValid,
 
};
