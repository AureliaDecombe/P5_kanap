export default class Model {

    /**
     * Récupère la liste des produits sur l'API fournie (localisation externe) et renvoie l'objet correspondant au format JSON (JavaScriptObjectNotation).
     * @returns { Promise }
     */
    async getListProducts() {
        try {
            let res = await fetch('http://localhost:3000/api/products');
            return res.json();            
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Récupère la liste des produits sur l'API fournie (localisation externe) en y associant leur Id et renvoie l'objet correspondant au format JSON (JavaScriptObjectNotation).
     * @param { String } idProduct 
     * @returns { Promise }
     */
    async getProductById(idProduct) {
        try {
            let res = await fetch("http://localhost:3000/api/products/"+ idProduct);
            return res.json();
        } catch (err) {
            console.log(err);
        }
    };
    
    /**
     * Envoie les données utilisateur (le panier et les coordonnées) à l'API afin de finaliser la commande et de vider le localstorage
     * @param { Object | Array } userData 
     * @returns { Promise }
     */
    async postOrder(userData) {
        try {
            let res = await fetch("http://localhost:3000/api/products/order", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userData)
            });
            return res.json();
        } catch (err) {
            console.log(err);
        }
    }
};