import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET as string;

export const auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    //const authorization = req.headers.token
    // const authorization = req.headers["authorization"];
    const authorization = req.headers.cookie;
    console.log(req.headers.cookie)
    if (!authorization) {
        return res.status(401).json({ error: "Please sign in first" });
        
        //return res.status(401).json({error:  "Sign in first"})
    }
    
    const token = authorization.slice(6, authorization.length) as string;
    // console.log(token);

    let valid = jwt.verify(token, jwtsecret);
    

    if(!valid){
        return res.status(401).json({error: "Please sign in again"})
    }
    console.log("isValid",valid)
    const {id} = valid as {[key:string]:string}

    req.user = id
    next()
  } catch (error) {
    res.status(500).json(error);
  }
};


