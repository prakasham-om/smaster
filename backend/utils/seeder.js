const Product = require('../models/productModel');
require('dotenv').config();
const connectDataBase = require('../config/database')
const data=require('../data.json')



connectDataBase()

const seedProducts=async ()=>{
    console.log(data)
    try {
        await Product.deleteMany();
        console.log("Deleting all products");

        await Product.insertMany(data)
        console.log("adding all products from file");
        
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedProducts()