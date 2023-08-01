import 'dotenv/config';
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import noteRoutes from './routes/notesRoutes';
import CreateHttpError, { isHttpError } from 'http-errors';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Error handlers middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  next(CreateHttpError(404, 'Endpoint not found!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknow error occured';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;
