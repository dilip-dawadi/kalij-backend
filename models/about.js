import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
    Atitle: String,
    Amessage: String,
    AselectedFile: String,
})

var aboutMessage = mongoose.model('AboutMessage', aboutSchema);

export default aboutMessage;