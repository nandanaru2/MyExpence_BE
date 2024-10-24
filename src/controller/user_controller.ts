import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../middleware/jwt";
import Joi from "joi";
import { UserData, CreateUser } from "../database/user_data";

export interface useraDataObj {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  details: string;
}
export interface Userdetails {
  firstname: string;
  lastname: string;
  email: string;
  userId: string;
}

export interface CreateRespose {
  Message: string;
  statusCode: number;
}

export const Login = async (req: Request, res: Response) => {
  // Validate the input schema
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error, value } = userSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const user = await UserData(
      ["firstname", "lastname", "userId", "email", "password"],
      { email: value.email }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (isPasswordMatch) {
      const { password, ...tokenObj } = user.dataValues;
      return res.status(200).json({
        message: "Login successful",
        token: createAccessToken(tokenObj),
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "An error occurred", details: err.message });
  }
};
export const createUser = async (req: Request, res: Response) => {
  const userSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    details: Joi.string(),
  });
  const { error, value } = userSchema.validate(req.body, {
    allowUnknown: false,
  });

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const newUser: CreateRespose | null = await CreateUser({ ...value });
    res
      .status(newUser ? newUser.statusCode : 500)
      .json(
        newUser
          ? { Message: newUser.Message }
          : { Message: "Internal Server Error" }
      );
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//     const userSchema = Joi.object({
//         firstname: Joi.string().required(),
//         lastname: Joi.string().required(),
//         email: Joi.string().email().required(),
//         details: Joi.string()
//     });
//     const { error, value } = userSchema.validate(req.body, { allowUnknown: false });

//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     try {
//         const userupdate = await User.update( value , { where: { email: value.email } });
//         if (userupdate[0] === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//     res.status(200).json({ message: 'User updated successfully' });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };
