import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
import {Blogs} from "./models/Blogs.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

let connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}))
app.use(bodyParser.json())

app.get("/", async(req, res)=>{
    try{
        let blogs = await  Blogs.find();
        console.log(blogs);
        res.json(blogs);
    }
    catch(err)
    {
        console.log(err);
    }
})

app.post("/create", (req, res)=>{
    try{
        let data = req.body;
        data.id = uuidv4();;
        let blog = new Blogs(data);
        blog.save();
        res.send("done");
    }
    catch(err)
    {
        console.log(err);
    }
})

app.delete("/blog/delete", async(req, res) => {
    try{
        const id = req.body.id;
        await Blogs.deleteOne({id : id})
        res.send("deleted")
    }
    catch(err)
    {
        console.log(err);
    }
});


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})















    // const index = blogs.findIndex(blog => blog.id == id);
        
        // if (index !== -1) {
            //     blogs.splice(index, 1);
            //     res.status(200).send("Deleted successfully");
            // } else {
                //     res.status(404).json({ message: "Blog not found" });
                // }



    // blogs.push(data);
    // console.log("new blogs", blogs)