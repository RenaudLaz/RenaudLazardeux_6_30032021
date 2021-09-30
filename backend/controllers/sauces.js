const Sauce = require('../models/sauces');

//Création de la sauce
exports.createSauce = (req, res, next) => {
    //delete req.body._id; 
console.log(req.sauce);
    const sauceObject = JSON.parse(req.body.sauce);
    
    delete sauceObject.id;

    const sauce = new Sauce({
      imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdrmmMvVy-UfJwLLxEuDUNIoIa8R6dYTUvyINbrLwKEazjhjidXTxy5do_8vxOPGPX7_RyaiU&usqp=CAc`,
      ...sauceObject
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => {console.log(error); res.status(400).json({ error })});
};

//Modification de la sauce
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
}; 

//Suppression de la sauce
exports.deleteSauce =  (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
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