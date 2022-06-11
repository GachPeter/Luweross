mongoose = require("mongoose");

mongoose.connect("mongodb+srv://survey_ss:005116011@cluster0.esvvm.mongodb.net/?retryWrites=true&w=majority/Luwero_survey", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("db succeded");
})

module.exports = mongoose;
