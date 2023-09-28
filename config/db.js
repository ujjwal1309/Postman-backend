const mongoose=require("mongoose");
require('dotenv').config()

const connection=mongoose.connect("mongodb+srv://ujjwal:ujjwal@cluster0.2qw5x.mongodb.net/postman")
module.exports={connection}