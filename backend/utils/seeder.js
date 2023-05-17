import dotenv from 'dotenv'
import { connectDB } from '../config/database.js'
import Product from '../models/product.js'
import products from '../data/products.json' assert { type: 'json' }

dotenv.config({ path: 'backend/config/config.env' })

connectDB()

const seedProducts = async () => {
    try {
        await Product.deleteMany()
        console.log('Products deleted')

        await Product.insertMany(products)
        console.log('All products added')
    } catch (error) {
        console.log(error.message)
    }
    process.exit()
}

seedProducts()
