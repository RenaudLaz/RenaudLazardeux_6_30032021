const fs = require('fs'); //application pour modifier système de fichiers
const Sauce = require('../models/sauces');
const User = require('../models/user');


//Création de la sauce
exports.createSauce = (req, res, next) => {
  console.log(req.Sauce);
  const sauceObject = JSON.parse(req.body.sauce); 
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => {console.log(error); res.status(400).json({ error })});
};

//Modification de la sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}; 

//Suppression de la sauce
exports.deleteSauce =  (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

//Affichage de la sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//Renvoie un tableau de toutes les sauces de la base de données
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};