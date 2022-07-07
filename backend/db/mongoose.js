const mongoose = require("mongoose")

mongoose
    .connect("mongodb+srv://tell_me_why:tell_me_why@cluster0.2gok2.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error, "mongoose error"))


module.exports = mongoose;