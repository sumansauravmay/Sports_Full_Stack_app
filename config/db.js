
const mongoose=require("mongoose")

// mongoose.set("strictQuery",false)

require("dotenv").config();

const connection=mongoose.connect('mongodb+srv://suman:suman@cluster0.dfuyndi.mongodb.net/game?retryWrites=true&w=majority')

module.exports={connection}