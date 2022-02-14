const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(()=>{
        console.log("MongoDB connetcion successful.");
    }).catch(()=>{
        console.error("MongoDB connection failed !");
    })
}

module.exports = connectDatabase;