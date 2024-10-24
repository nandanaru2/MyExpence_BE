import express, { Request, Response,NextFunction } from 'express';
import cors from 'cors';
import MainRoute from './src/routes'
const app = express();
const PORT = process.env.PORT || 8080;
import { syncDatabase } from './src/models';

syncDatabase();


// Enable CORS for all routes
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Prevents caching
  res.setHeader('Pragma', 'no-cache');        // HTTP 1.0 compatibility
  res.setHeader('Expires', '0');              // Ensure the resource is always considered expired
  next();
});
app.use(express.json());

MainRoute(app);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Not Found');
  });
  

app.listen(PORT
  , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default app