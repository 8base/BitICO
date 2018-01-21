var RSKService = require('./services/RSKService');

const rskService = new RSKService("https://localhost:4444", "0x0e082742330d4a06ef127ca89f78f7283141c572", "923b6888e648c22a69fbb4afe985fe90d61c6c3f5d84b62025e358bb8fcf1776");
var crowdsaleInstance = rskService.deployCrowdsale("My Token", "TKN", new Date(2018, 1, 0), new Date(2018, 2, 0), 0.000000001, 0.000000004, 0.000000008, 0x0e082742330d4a06ef127ca89f78f7283141c572);
console.log(crowdsaleInstance);