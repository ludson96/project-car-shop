import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import CarRouter from './Routes/CarRoute';
import MotorcycleRouter from './Routes/MotorcycleRoute';
import UserRouter from './Routes/UserRoute';
import SaleRouter from './Routes/SaleRoute';
import HealthRouter from './Routes/HealthRoute';
import ErrorHandler from './Middlewares/ErrorHandler';
import swaggerDocument from './docs/swagger.json';

const app = express();

// Middlewares de Segurança e Parsing
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());

// Rate Limiting para proteção contra abusos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use(limiter);

// Documentação Interativa Swagger e Redirecionamento da Raiz
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (_req, res) => res.redirect('/docs'));

// Rotas da Aplicação
app.use('/health', HealthRouter);
app.use('/users', UserRouter);
app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);
app.use('/sales', SaleRouter);

// Middleware Central de Tratamento de Erros
app.use(ErrorHandler.execute);

export default app;
