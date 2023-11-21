const mongoose = require("mongoose");
const uri = "mongodb+srv://<username>:<password>@csc436.y3m1hcx.mongodb.net/?retryWrites=true&w=majority";
function connect() {
    const options = { useNewUrlParser:true };
    mongoose.connect(uri, options).then(
        () => { console.log("Database connection established!"); },
        err => { console.log("Error connecting Database instance due to: ", err); }
    )
}
module.exports = connect