import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
    id:String,
    title: String,
    content: String,
});

export const Blogs = mongoose.model('Blogs', BlogsSchema); 