
//modules
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var relationship = require('mongoose-relationship');
var Schema = mongoose.Schema;

//definitions
var User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    adresse: {
        ville: String,
        quartier: String,
        secteur: String
    },
    telephone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var Admin = User.extend({
    offres: [{
        type: Schema.ObjectId,
        ref: "Offre"
    }]
});

var Client = User.extend({
    pouletMoney: {
        type: Schema.ObjectId,
        ref: "PouletMoney"
    },
    commandes: [{
        type: Schema.ObjectId,
        ref: "Commande"
    }],
    demandes: [{
        type: Schema.ObjectId,
        ref: "Demande"
    }]
});

var Offre = new Schema({
    _id: Schema.ObjectId,
    datePublication: {
        type: Date,
        required: true
    },
    typeOffre: {
        type: String,
        required: true
    },
    grosseur: {
        type: String,
        required: true
    },
    prixUnitaire: {
        type: Number,
        min: 0,
        required: true
    },
    quantiteStock: {
        type: Number,
        min: 0,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.ObjectId,
        ref: "Admin",
        childPath: "offres"
    },
    commandes: [{
        type: Schema.ObjectId,
        ref: "Commande"
    }]
});

var Commande = new Schema({
    _id: Schema.ObjectId,
    coutLivraison: {
        type: Number,
        min: 0,
        required: true
    },
    dateLivraision: {
        type: Date,
        required: true
    },
    offre: {
        type: Schema.ObjectId,
        ref: "Offre",
        childPath: "commandes"
    },
    client: [{
        type: Schema.ObjectId,
        ref: "Client",
        childPath: "commandes"
    }],
    prestations: [{
        type: Schema.ObjectId,
        ref: "Prestation"
    }]
});

var Prestation = new Schema({
    _id: Schema.ObjectId,
    cout: {
        type:Number,
        min: 0,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    datePublication: {
        type: Date,
        required: true
    },
    quantite: {
        type: Number,
        min: 0,
        required: true
    },
    duree: {
        type: Date,
        required: true
    },
    reduction: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    commande: {
        type: Schema.ObjectId,
        ref: "Prestation",
        childPath: "prestations"
    }
});

var Demande = new Schema({
    _id: Schema.ObjectId,
    datePublication: {
        type: Date,
        required: true
    },
    typePoulet: {
        type: String,
        required: true
    },
    grosseur: {
        type: String,
        required: true
    },
    quantite: {
        type: Number,
        min: 0,
        required: true
    },
    client: [{
        type: Schema.ObjectId,
        ref: "Client",
        childPath: "demandes"
    }]
});

var Historique = new Schema({
    _id: Schema.ObjectId,
    operation: {
        type: String,
        required: true
    },
    objectHistorique: {
        type: String,
        required: true
    },
    coutOperation: {
        type: Number,
        required: true
    },
    dateOperation: {
        type: Date,
        required: true
    },
    pouletMoney: {
        type: Schema.ObjectId,
        ref: "PouleyMoney",
        childPath: "historiques"
    }
});

var PouletMoney = new Schema({
    _id: Schema.ObjectId,
    montant: {
        type: Number,
        required: true
    },
    historiques: [{
        type: Schema.ObjectId,
        ref: "Historique"
    }],
    client: {
        type: Schema.ObjectId,
        ref: "Client",
        childPath: "pouletMoney"
    }
});

//defintions des relations
Offre.plugin(relationship, {relationshipPathName: 'admin'});
Commande.plugin(relationship, { relationshipPathName: 'client'});
Commande.plugin(relationship, {relationshipPathName: 'offre'});
Prestation.plugin(relationship, {relationshipPathName: 'commande'});
Demande.plugin(relationship, { relationshipPathName: 'client'});
Historique.plugin(relationship, {relationshipPathName: 'pouletMoney'});
PouletMoney.plugin(relationship, {relationshipPathName: 'client'});


//les modeles
var AdminModel = mongoose.model("Admin", Admin);
var ClientModel = mongoose.model("Client", Client);
var OffreModel = mongoose.model("Offre", Offre);
var CommandeModel = mongoose.model("Commande", Commande);
var PouletMoneyModel = mongoose.model("PouletMoney", PouletMoney);
var HistoriqueModel = mongoose.model("Historique", Historique);
var DemandeModel = mongoose.model("Demande", Demande);
var PrestationModel = mongoose.model("Prestation", Prestation);


module.exports = {
    AdminModel: AdminModel,
    ClientModel: ClientModel,
    OffreModel: OffreModel,
    CommandeModel: CommandeModel,
    PouletMoneyModel: PouletMoneyModel,
    HistoriqueModel: HistoriqueModel,
    DemandeModel: DemandeModel,
    PrestationModel: PrestationModel
}; 