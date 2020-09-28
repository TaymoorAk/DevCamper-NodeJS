const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load Models
const Bootcamp = require("./models/Bootcamp");
//Connect to DB
mongoose.connect('mongodb+srv://TaymoorAkbar:s22Deavszf3sXgw@cluster1.r2mef.gcp.mongodb.net/DevCamper?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
//Read JSON
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`))

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log("Data Imported".green.inverse)
        process.exit();
    }
    catch (e) {
        console.log(e.red.inverse)
    }
}
//Deleting Data from DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log("Data Destroyed".green.inverse)
        process.exit();
    }
    catch (e) {
        console.log(e.red.inverse)
    }
}

if (process.argv[2] === '-i') {
    importData()
}
else if (process.argv[2] === '-d') {
    deleteData()
}
