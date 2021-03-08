const client = require('./database');

const dataMapper = {

    getAllFigurines: (callback) => {
        client.query("SELECT * FROM figurine;",
            (error, data) => {
                if(error) {
                    console.trace(error);
                } else {
                    
                    // s'il n'y a pas d'erreur on recupére les resultats qui viennent de la BDD
                    const figurines = data.rows;
                    //console.log(figurines);
                    // on appel le callback transmis par celui qui à appelé la méthode
                    callback(figurines);
                }
            }
        );
    },

    getOneFigurine: (id, callback) => {
        client.query(`SELECT * FROM figurine WHERE id = ${id};`,
            (error, data) => {
                if(error) {
                    console.trace(error);
                } else {
                    
                    // s'il n'y a pas d'erreur on recupére les resultats qui viennent de la BDD
                    const figurineArray = data.rows;
                    
                    //console.log(figurineArray);
                    // on appel le callback transmis par celui qui à appelé la méthode
                    callback(figurineArray);
                }
            }
        )
    }
};

module.exports = dataMapper;

