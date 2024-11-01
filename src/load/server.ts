import express from 'express'
import prisma from '../config/db';

import { Request, Response, NextFunction } from 'express';
import router from '../api/routes';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()
const port = 5000;
app.use(cors({
  origin: '*', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json())
app.use(router)

// configure cors
app.get('/health', (req, res) => {
	return res.status(200).json({ message: 'I am a public route' });
});

// server.js
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  const message = err.message ? err.message : 'Server Error Occurred';
  const status = err.status ? err.status : 500;

  res.status(status).json({
      message,
  });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1); // Exit the process with failure
  }
}

startServer();








