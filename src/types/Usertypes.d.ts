import express from 'express';
interface User{
    
        firstname: string,
        lastname: string,
        userId: string,
        email: string
      
}
declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the user property type as needed, or `any`
    }
  }
}