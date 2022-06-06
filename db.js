mongoose = require("mongoose");

mongoose.connect("mongodb://z5cf3cf17-mongodb.z21686b2e.qovery.cloud:27017/sample1", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("db succeded");
})

module.exports = mongoose;