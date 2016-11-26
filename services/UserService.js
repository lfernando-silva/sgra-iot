var User = require('../models/User.js');

module.exports = {
    findUserDispositivo : function (dispositivo, callback) {
        var where = { "veiculos.dispositivo.numeroSerie": dispositivo };
        User.findOne(where, function (err, user) {
            return (err || user)? callback(err): callback(err, user);
        });
    },

    updateUserIsConectado: function (numeroSerie, isConectado, callback) {
        return update(numeroSerie, isConectado, 'isConectado', callback);
    },

    updateUserIsAberto: function (numeroSerie, isAberto, callback) {
        return update(numeroSerie, isAberto, 'isAberto', callback);
    }
};

function update(numeroSerie, is, isAction, callback){
    var where = { "veiculos.dispositivo.numeroSerie": numeroSerie };
    var updateble = "veiculos.$.dispositivo.".concat(isAction);
    var uset = { $set: { updateble: isAction } };
    
    User.update(where, uset, function (err) {
        return err? callback(err): callback();
    });
}