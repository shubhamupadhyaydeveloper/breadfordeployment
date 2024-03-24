const Joi = require('joi')

const signUpSchema  = Joi.object({
   name : Joi.string().required(),
   username : Joi.string().required(),
   email : Joi.string().required().email(),
   password : Joi.string().required().min(6),
   profilePic : Joi.string().default(''),
   followers : Joi.array().items(Joi.string()).default([]),
   following : Joi.array().items(Joi.string()).default([]),
   bio : Joi.string().default('')
}).required()

module.exports = {signUpSchema}