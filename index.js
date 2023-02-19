const express= require("express");

const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRouter")
const { noteRouter } = require("./routes/noteRouter");
const { authenticate } = require("./middlewares/authenticate.middlewares");
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT;
console.log(port)

const app = express();
app.use(express.json())
app.use(cors)
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.get("/",(req,res)=>{
    console.log("Homepage")
})
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log({"err":error})
    }
    connection
    console.log(`Server is running at ${process.env.PORT}` )
})