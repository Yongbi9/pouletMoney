
var mongoose = require('mongoose');
var MyModels = require('../serveur/models/schemaModel.js');

mongoose.connect('mongodb://localhost/my_database');


var AdminModel = MyModels.AdminModel;
var ClientModel = MyModels.ClientModel;
var OffreModel = MyModels.OffreModel;
var CommandeModel = MyModels.CommandeModel;
var PouletMoneyModel = MyModels.PouletMoneyModel;
var HistoriqueModel = MyModels.HistoriqueModel;
var DemandeMoney = MyModels.DemandeModel;
var PrestationMoney = MyModels.PrestationModel;

var admin = new AdminModel();
var client = new ClientModel();
var offre = new OffreModel();
var commande = new CommandeModel();
var poulet = new PouletMoneyModel();
var historique = new HistoriqueModel();
var demande = new DemandeMoney();
var prestation = new PrestationMoney();

//console.log();
console.log("ADMIN      "+admin);
console.log("CLIENT     "+client);
console.log("OFFRE      "+offre);
console.log("COMMANDE   "+commande);
console.log("POULET     "+poulet);
console.log("HISTORIQUE "+historique);
console.log("DEMANDE    "+demande);
console.log("PRESTATION "+prestation);


