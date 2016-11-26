﻿var mongoose = require('mongoose');

var Config = require('../config/config.js');
var MessageService = require('../services/MessageService.js');
var UserService = require('../services/UserService.js');

var SocketEventHandler = {
    
    handleMongooseConnection: function () {
        mongoose.connect(config.mongoUri);
    },
    
    handleNewConnection: function (socket) {
        console.log('Connection from ' + socket.remoteAddress + ":" + socket.remotePort + " at " + new Date());
    },
    
    handleSetKeepAlive: function (socket, time) {
        socket.setKeepAlive(true, time);
    },
    
    handleData: function (options) {

        var checkout = MessageService.getIsDisparadoStatus(options.data.toString());
        var serial = checkout.serial;
        var ledStatus = checkout.ledStatus;
        
        UserService.findUserDispositivo(serial, function (err, result) {
            if (err || !result) {
                console.log("Not Found " + serial);
            } else {
                UserService.updateUserIsConectado(serial, "1", function (err) {
                    var veiculoAtual = MessageService.getStatus(result.veiculos, checkout.serial);
                    
                    console.log("Updating car status from " + veiculoAtual.placa + " : " + veiculoAtual.status + " at " + new Date());
                    
                    var writeMsg = MessageService.getWriteMessage(veiculoAtual.status);
                                        
                    //sistema só mostra "alarme disparado" se o status é ativado e o led amarelo estiver aceso.
                    UserService.updateUserIsAberto(serial, (writeMsg == '1') && (ledStatus == "1")? "1":null, 
                        function () { 
                        options.socket.write(writeMsg);
                    });
                });
            }
        });
    },
    
    handleSocketDestroy: function (options) {
        var checkout = MessageService.getIsDisparadoStatus(options.data.toString());
        var serial = checkout.serial;
        UserService.updateUserIsConectado(serial, null, function (err) {
            console.log("Connection " + options.type + " from " + options.socket.remoteAddress + ":" + options.socket.remotePort)
            options.socket.destroy();
        });
    }
}

module.exports = SocketEventHandler;