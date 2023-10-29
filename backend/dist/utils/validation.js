"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email').options({ messages: { 'any.only': '{{#label}} does not match' } }),
    firstName: joi_1.default.string().trim().lowercase().required(),
    lastName: joi_1.default.string().trim().lowercase().required(),
    userName: joi_1.default.string().trim().lowercase().alphanum().required(),
    password: joi_1.default.string().min(6).regex(/^[A-Za-z0-9]{6,20}$/).required(),
    phonenumber: joi_1.default.number().required(),
    confirmpassword: joi_1.default.equal(joi_1.default.ref('password')).required().label('Confirm password').options({ messages: { 'any.only': '{{#label}} does not match' } })
});
exports.loginSchema = joi_1.default.object().keys({
    userName: joi_1.default.string().trim().lowercase().alphanum().required(),
    password: joi_1.default.string().min(6).max(20).regex(/[a-zA-Z0-9]/).required()
});
exports.createBlogSchema = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    coverImage: joi_1.default.string().optional(),
    content: joi_1.default.string().required(),
    blogcategory: joi_1.default.string().required(),
    user: joi_1.default.string().required(),
    isActive: joi_1.default.boolean().required(),
});
exports.updateBlogSchema = joi_1.default.object().keys({
    title: joi_1.default.string().optional(),
    coverImage: joi_1.default.string().optional(),
    content: joi_1.default.string().optional(),
    blogcategory: joi_1.default.string().optional(),
    user: joi_1.default.string().optional(),
    isActive: joi_1.default.boolean().optional(),
});
