import Joi from 'joi';



export const registerSchema = Joi.object().keys({
    email: Joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email').options({messages: {'any.only': '{{#label}} does not match'}}),
    firstName: Joi.string().trim().lowercase().required(),
    lastName: Joi.string().trim().lowercase().required(),
    userName: Joi.string().trim().lowercase().alphanum().required(),
    password: Joi.string().min(6).regex(/^[A-Za-z0-9]{6,20}$/).required(),
    phonenumber: Joi.number().required(),
    confirmpassword: Joi.equal(Joi.ref('password')).required().label('Confirm password').options({messages: {'any.only': '{{#label}} does not match'}})

})

export const loginSchema = Joi.object().keys({
    userName: Joi.string().trim().lowercase().alphanum().required(),
    password: Joi.string().min(6).max(20).regex(/[a-zA-Z0-9]/).required()
})



export const createBlogSchema = Joi.object().keys({
    title: Joi.string().required(),
    coverImage: Joi.string().optional(),
    content: Joi.string().required(),
    blogcategory: Joi.string().required(),
    user: Joi.string().required(),
    isActive: Joi.boolean().required(),
    
  });
  
  export const updateBlogSchema = Joi.object().keys({
    title: Joi.string().optional(),
    coverImage: Joi.string().optional(),
    content: Joi.string().optional(),
    blogcategory: Joi.string().optional(),
    user: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
   
    
  });
  
