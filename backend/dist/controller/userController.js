"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const validation_1 = require("../utils/validation");
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password, confirm_password, userName, phonenumber, } = req.body;
        const iduuid = (0, uuid_1.v4)();
        // validate with Joi
        const validateResult = validation_1.registerSchema.validate(req.body);
        if (validateResult.error) {
            return res.status(400).json({
                error: validateResult.error.details[0].message,
                message: "Registration failed",
            });
        }
        // generate salt for password hashing
        const passwordHash = await bcryptjs_1.default.hash(password, await bcryptjs_1.default.genSalt());
        // check if user exists before creating a new user
        const user = await user_1.UserInstance.findOne({
            where: { email: email },
        });
        if (!user) {
            const newuser = await user_1.UserInstance.create({
                id: iduuid,
                firstName,
                lastName,
                userName,
                email,
                phonenumber,
                password: passwordHash,
            });
            return res.status(201).json({
                message: "User created successfully",
                user: newuser,
            });
        }
        return res.status(400).json({
            error: "Email already exists",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    console.log("req BODY", req.body);
    const { userName, password } = req.body;
    const iduuid = (0, uuid_1.v4)();
    const validateResult = validation_1.loginSchema.validate(req.body);
    if (validateResult.error) {
        return res
            .status(400)
            .json({ error: validateResult.error.details[0].message });
    }
    try {
        // get the user information before generating the token
        const user = await user_1.UserInstance.findOne({
            where: { userName: userName },
        });
        if (!user) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }
        const validUser = await bcryptjs_1.default.compare(password, user.password);
        if (validUser) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtsecret, { expiresIn: "5d" });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 2 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                msg: "User login successfully",
                user: user,
                token: token,
            });
        }
        else {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};
exports.loginUser = loginUser;
// logout of a user.
const logoutUser = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
};
exports.logoutUser = logoutUser;
