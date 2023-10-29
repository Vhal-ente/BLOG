import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { registerSchema, loginSchema } from "../utils/validation";
import { UserInstance } from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      confirm_password,
      userName,
      phonenumber,
    } = req.body;
    const iduuid = uuidv4();

    // validate with Joi
    const validateResult = registerSchema.validate(req.body);

    if (validateResult.error) {
      return res.status(400).json({
        error: validateResult.error.details[0].message,
        message: "Registration failed",
      });
    }

    // generate salt for password hashing
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    // check if user exists before creating a new user
    const user = await UserInstance.findOne({
      where: { email: email },
    });

    if (!user) {
      const newuser = await UserInstance.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log("req BODY", req.body);
  const { userName, password } = req.body;
  const iduuid = uuidv4();

  const validateResult = loginSchema.validate(req.body);

  if (validateResult.error) {
    return res
      .status(400)
      .json({ error: validateResult.error.details[0].message });
  }

  try {
    // get the user information before generating the token
    const user = await UserInstance.findOne({
      where: { userName: userName },
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      const token = jwt.sign({ id: user.id }, jwtsecret, { expiresIn: "5d" });
      res.cookie('token',token,{
        httpOnly:true,
        maxAge: 2* 24 * 60 * 60 * 1000
    })
      return res.status(200).json({
        msg: "User login successfully",
        user: user,
        token: token,
      });
    } else {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// logout of a user.
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("jwt");

  res.status(200).json({ message: "User logged out successfully" });
};
