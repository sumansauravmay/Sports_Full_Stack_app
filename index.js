const express=require("express")
const {userRouter}=require("./routes/user.route");
const {connection}=require("./config/db");
const {eventRouter}=require("./routes/event.route");
const {eventhomeRouter}=require("./routes/Allevent.route");
const {authenticate}=require("./middlewares/user.middlewares");
require("dotenv").config();
const cors=require("cors")
const app=express()

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.use("/",userRouter)
app.use("/",eventhomeRouter)
// app.use(authenticate);
app.use("/",eventRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log(`port is running on ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})



