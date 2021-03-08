// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// On intègre les sessions 

const expressSession = require('express-session');


// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();
//On indique à express le moteur de vue ainsi que son emplacement
app.set('view engine', 'ejs');
app.set('views', './app/views');

//LES COOKIES

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('./public'));

// si le contenu de la requete est urlencoded alors ce middleware va transformer le contenu en objet
app.use(express.urlencoded({extended: true}));


// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
