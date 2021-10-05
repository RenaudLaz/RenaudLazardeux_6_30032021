/*communication avec le serveur*/
const express = require('express');
const mongoose = require('mongoose'); //application MongoDB
const app = express(); /*application Express*/
require('dotenv').config(); //application .env


/*connection à MongoDB*/
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.CONNECT_DATA_BASE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));


/*middleware communication des différent port(localhost) possible*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées
  next();
});

/*parle en json*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const saucesRoutes = require('./routes/sauces');
app.use('/api/sauces', saucesRoutes);

const userRoutes = require('./routes/user');
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;