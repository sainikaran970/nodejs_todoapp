import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import {errorMiddleWare} from "./middlewares/error.js"
import cors from "cors"



export const app = express()


config({
    path : "./data/config.env"
})

// Using Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true,
}))


// Using Routes
app.use("/api/v1/users" , userRouter) // Here /api/v1/users is a prefix and from now no need to add /api/v1/users in every other route 
app.use("/api/v1/task" , taskRouter) // Here /api/v1/task is a prefix and from now no need to add /api/v1/task in every other route 


app.get("/" , (req , res) => {
    res.send("Nice Working")
})

// Error Handling by using Error MiddleWare
app.use(errorMiddleWare)