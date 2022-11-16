export default class Model {
    async getListProducts() {
        try {
            let res = await fetch('http://localhost:3000/api/products');
            return res.json();
            
        } catch (err) {
            console.log(err);
        }
    };

    async getProductById(idProduct) {
        try {
            let res = await fetch("http://localhost:3000/api/products/"+ idProduct);
            return res.json();
        } catch (err) {
            console.log(err);
        }
    };
    
    async postOrder(userData) {
        try {
            let res = await fetch("http://localhost:3000/api/products/order", {
                method : "POST",//une requête http à au moins 2 parties à définir : header et body
                headers : {//recherche à faire 👍
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userData)//envoi d'une chaîne car backend déjà développé, en temps normal, on envoie juste userdata...
            });
            return res.json();
        } catch (err) {
            console.log(err);
        }
    }
};




