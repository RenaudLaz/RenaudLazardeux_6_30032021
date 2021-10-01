const fs = require('fs'); //application pour modifier système de fichiers

const Sauce = require('../models/sauce');
const user = require('../models/user');

/*POST /api/sauces Création sauce*/
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créé'}))
        .catch(error => res.status(400).json({ error }));
};

/*GET /api/sauces/:id Renvoie la sauce avec l’_id fourni.*/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ //recherche dans le modéle sauce
        _id: req.params.id
    }).then(
        (sauce) => {res.status(200).json(sauce);}
    ).catch(
        (error) => {res.status(404).json({error: error});}
    );
};

/*PUT /api/sauces/:id Met à jour la sauce avec l'_id fourni.*/
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
  };

/*DELETE /api/sauces/:id Supprime la sauce avec l'_id fourni.*/
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { //fonction unlink du package fs pour supprimer
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé'}))
                    .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
  };

/*GET /api/sauces Renvoie un tableau de toutes les sauces de la base de données.*/
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then( //modèle Mongoose afin de renvoyer un tableau
        (sauces) => {res.status(200).json(sauces);}
        ).catch((error) => {res.status(400).json({error: error});}
    );
};

//POST like
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      switch (req.body.like) {
        case 1:
          break;
        case 0:
          break;
        case -1:
          break;
      }
      res.status(200).json( {message: 'tout vas bien'} )
    })
    .catch(error => res.status(500).json({ error }));
};
