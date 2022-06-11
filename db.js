mongoose = require("mongoose");

mongoose.connect( process.env.link, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("db succeded");
})

module.exports = mongoose;
