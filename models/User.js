var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nome: { type: String, required: "Insira seu primeiro nome" },
    cpf: { type: String, required: "Insira seu CPF" },
    email: { type: String, required: "Insira seu email" },
    password: { type: String, required: "Insira a senha" },
    veiculos: { type: Array, default: [] },
    created: { type: Date, default: Date.now }
});

function validation(value, callback) {
    var userService = require("../services/UserService.js");
    userService.findUser(value, function (err, user) {
        if (err) return callback(false);
        return callback(!user);
    });
}

userSchema.path('email').validate(validation, "Email já existente!");
var User = mongoose.model("User", userSchema);

module.exports = User;