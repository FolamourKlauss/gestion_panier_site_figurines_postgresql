const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (request, response) => {
    dataMapper.getAllFigurines(
      
      (figurines) => {

        response.render('accueil', {figurines});
      }
    );
  },

  // méthode pour la page article
  articlePage: (request, response) => {
    const articleId = parseInt(request.params.id, 10);
    
    dataMapper.getOneFigurine(
      articleId,
      (figurineArray) => {
        //console.log(figurine);
    let goodArticle = figurineArray.find((isThisArticleAvailable) => {
        return isThisArticleAvailable.id === articleId;
    });
    console.log(goodArticle);
        response.render('article', {figurineArray, articleId, goodArticle});
      }
    )
  }
}


module.exports = mainController;


