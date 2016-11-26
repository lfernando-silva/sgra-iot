var fs = require('fs');
var path = require('path');

var EnvConfigs = {};
var path = path.join(__dirname) + '/configs/';

var prod = "./configs/ProdConfig.json";
var dev = "./configs/DevConfig.json";

module.exports = require(fs.existsSync(path + 'ProdConfig.json')? prod:dev);