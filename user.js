const mongoose = require("mongoose");

UserScheme = mongoose.Schema({ time: Number, name: String, feature: String, class: String, stream: String });

User = mongoose.model("User", UserScheme);

module.exports = User;