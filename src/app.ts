import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import { ProductRoutes } from './app/modules/products/products.route';
import { OrderRouts } from './app/modules/orders/orders.route';
const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// application routes
app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/orders', OrderRouts);

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = err.message || 'Something Wrong';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });

});

app.all('*', (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Not Found",
    });
})

export default app;