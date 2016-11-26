var MessageService = {
    getIsDisparadoStatus: function (arduinoCheckout) {
        return {
            ledStatus: arduinoCheckout.slice(15),
            serial: arduinoCheckout.slice(0, 15)
        }
    },
    getWriteMessage: function (status) {
        return status == "1"? "1":"2";
    },
    getStatus: function (veiculos, serial) {
        return veiculos
            .filter(function (v) {
            return v.dispositivo.numeroSerie == serial;
        })
            .map(function (v) {
            return {
                status: v.dispositivo.ativacoes[0].status,
                placa: v.placa
            };
        });
    }
}

module.exports = MessageService;