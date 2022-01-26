import mongoose from "mongoose";

const kalijSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    price: String,
    likes: { type: [String], default: [] },
    createdAt: {type: Date, default: new Date()},
})

var KalijsInfo = mongoose.model('KalijsInfo', kalijSchema);

export default KalijsInfo;