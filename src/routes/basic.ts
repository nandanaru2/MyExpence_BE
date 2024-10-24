import  { Router,Request, Response } from 'express';
import {createUser,Login} from '../controller/user_controller'
const router = require('express').Router()
// const { verifyToken } = require('../middleware/jwt');


let baseRoutes =  router;
    baseRoutes.post('/login',Login);
    baseRoutes.post('/createuser',createUser);
    baseRoutes.get('/base',(req: Request, res: Response) => {
        res.status(200).json({data:Math.random()*32});
    });

export default baseRoutes;