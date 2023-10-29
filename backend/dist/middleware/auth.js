"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
    try {
        //const authorization = req.headers.token
        // const authorization = req.headers["authorization"];
        const authorization = req.headers.cookie;
        console.log(req.headers.cookie);
        if (!authorization) {
            return res.status(401).json({ error: "Please sign in first" });
            //return res.status(401).json({error:  "Sign in first"})
        }
        const token = authorization.slice(6, authorization.length);
        // console.log(token);
        let valid = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!valid) {
            return res.status(401).json({ error: "Please sign in again" });
        }
        console.log("isValid", valid);
        const { id } = valid;
        req.user = id;
        next();
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.auth = auth;
