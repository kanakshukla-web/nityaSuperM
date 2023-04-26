const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    hash_password: {
        type: String,
        require: true,
    },
})

userSchema.methods.comparePassword = function compareAsync(param1, param2) {
    return new Promise(function (resolve, reject) {
        bcrypt.compareSync(param1, param2, function (err, res) {
            if (err) {
                reject(err);
            } else {
                console.log("Compared", res);
                resolve(res);
            }
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;