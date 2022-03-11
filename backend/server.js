import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

connectDB()

const app = express()

// handle json body
app.use(express.json())

// handler for index
app.get('/', (req, res) => {
    res.send('API is running')
})

// handler for products
app.use('/api/products', productRoutes)

// handler for users
app.use('/api/users', userRoutes)

// handler for order
app.use('/api/orders', orderRoutes)

// handler for paypal, send paypal client id
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// handler for 404 not found
app.use(notFound)

// handler for 500 internal error
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))