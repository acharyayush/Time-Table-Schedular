import dotenv from "dotenv";
import cors from "cors"
import semestersRoute from "./routes/semestersRoute.js"
dotenv.config()
import express from "express"
const PORT = process.env.PORT || 3000;
const app = express()
app.use(cors({origin: [process.env.ALLOWED_ORIGIN]}))
app.use(express.json());

app.use("/faculty", semestersRoute)

app.listen(PORT, ()=>{
    console.log("Server running at PORT: ", PORT)
})