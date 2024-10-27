import  { Request, Response } from 'express';
import {createUser,Login, updateUser} from '../controller/user_controller'
const router = require('express').Router()
import  {verifyToken} from '../middleware/jwt';


let baseRoutes =  router;
    baseRoutes.post('/login',Login);
    baseRoutes.post('/createuser',createUser);
    baseRoutes.post('/updateuser',verifyToken,updateUser);
    baseRoutes.get('/base',(req: Request, res: Response) => {
        res.status(200).json({data:Math.random()*32});
    });

export default baseRoutes;