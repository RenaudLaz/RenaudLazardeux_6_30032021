const express = require('express');
const bodyParser = require('body-parser'); //application body-parser
const mongoose = require('mongoose'); //application MongoDB

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

//connexion base de données mongoose
mongoose.connect('mongodb+srv://Renaud91:Django9119@hottakes.1y8uj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//permet l'accès à l'API depuis toutes origines, ajouter headers, envoie requete
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées
    next();
});
  
app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

