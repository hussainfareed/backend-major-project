const mongoose = require("mongoose");
const intitData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then((res) =>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
    
}

const intitDB  = async () =>{
    await Listing.deleteMany ({});
    intitData.data = intitData.data.map((obj) => ({...obj, owner: "694f702aac5a4bcf65cdeacc"}));
    await Listing.insertMany(intitData.data);
    console.log("data was initialized");
} 

intitDB();