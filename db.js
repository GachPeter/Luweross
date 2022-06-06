mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sample2", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("db succeded");
})

module.exports = mongoose;