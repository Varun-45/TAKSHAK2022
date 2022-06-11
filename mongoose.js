import mongoose from "mongoose";

const Schema = mongoose.Schema

const Query = new Schema({
    _id: String,
    name: String,
    queries: String
})

const QuerySchema = mongoose.model("query", Query)

export default QuerySchema