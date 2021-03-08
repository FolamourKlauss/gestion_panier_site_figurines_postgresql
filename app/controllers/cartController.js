const dataMapper = require('../dataMapper');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (request, response) => {
    
    const { cart } = request.session;
    const TVARATE = 0.2;
    const SHIPPING = 9.99;
    let totalHT = 0;

    // Je parcoure mon panier pour calculer
    // le total HT
    cart.forEach((figurineObject) => {
      totalHT += figurineObject.quantity * figurineObject.price;
    });

    const TVA = totalHT * TVARATE;
    const TOTAL = totalHT + TVA + SHIPPING;

    response.render('panier', {
      cart,
      SHIPPING,
      totalHT,
      TVA,
      TVARATE,
      TOTAL,
    });
    
  },

  cartAdd: (request, response) => {
    if (!request.session.cart) {
      request.session.cart = [];
    };
    
    console.log("cest le caddi vide la normalement", request.session.cart);
    let articleId = parseInt(request.params.id, 10);
    
    dataMapper.getOneFigurine(
      articleId,
      (figurineArray) => {
        //console.log(figurine);
        //console.log("la figarry", figurineArray);
        let goodArticle = figurineArray.find((isThisArticleAvailable) => {
            
            return isThisArticleAvailable.id === articleId;
        });
        console.log("rien");
        //Si l'article nest pas présent dans le panier on fixe sa quantité à 1
        if (!request.session.cart.find(searchGoodArticle => searchGoodArticle.id === goodArticle.id)) {
          goodArticle.quantity = 1;
          console.log(goodArticle);
          request.session.cart.push(goodArticle);
        } else {
          
          console.log('cest deja la');
          let oldArticle = request.session.cart.find(searchOldArticle=> searchOldArticle.id === articleId);
          oldArticle.quantity += 1;
          console.log(oldArticle);
          
        };
        
        console.log("cest le caddi rempli avec la quantity a jour", request.session.cart);
        

        response.redirect('/cart');
      }
    )
  },
  
  removeFromCart: (req, res) => {
    // Trouver la figurine dans le panier
    const { id } = req.params; // string
    const { cart } = req.session;

    const foundFigurine = cart.find(
      (figurineObject) => figurineObject.id == id
    );

    // Pas nécessaire, mais au cas où un user
    // mettrait un faux id dans l'url, je le renvoie
    // sur le panier
    if (!foundFigurine) {
      // Le return me permet juste
      // d'interrompre la fonction
      // après la redirection
      return res.redirect('/cart');
    }

    // Baisser la quantité de 1
    foundFigurine.quantity -= 1;
    // Si la quantité <= 0
    if (foundFigurine.quantity <= 0) {
      // retirer la figurine du tableau cart
      // filter me permet de récuperer un nouveau
      // tableau, qui ne contient que les éléments
      // que j'ai choisi de garder.
      // Je peux donc l'utiliser pour garder
      // tous les elements dont le .id n'est PAS egal à celui de l'url
      // const newCart = cart.filter((figurineObject) => figurineObject.id != id );
      // req.session.cart = newCart;
      req.session.cart = cart.filter(
        (figurineObject) => figurineObject.id != id
      );
    }
    return res.redirect('/cart');
  }
}


module.exports = cartController;
