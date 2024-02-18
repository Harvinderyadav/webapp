import express from "express";
//Import ing Routes

import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const port = 3000;

connectDB();

const app = express();
//Using Routes
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("everythiing is fine here");
} )

app.use("/api/v1/user", userRoute);
//error handeling middleware
 


app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});

