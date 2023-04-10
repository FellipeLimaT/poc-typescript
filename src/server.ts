import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
import { routes } from './routes/index.routes.js';

const server = express();

server.use(cors())
    .use(express.json())
    .use(routes)
    .use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`))