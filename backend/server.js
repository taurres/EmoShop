import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();


app.get('/', (req, res) => {
    res.send('API is running');
});

// handler for products
app.use('/api/products', productRoutes);

// handler for 404 not found
app.use(notFound);

// handler for 500 internal error
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));