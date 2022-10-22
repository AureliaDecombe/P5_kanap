export default class Model {
    async getListProducts() {
        try {
            let res = await fetch('http://localhost:3000/api/products');
            return res.json();
        } 
        catch (err) {
            console.log(err);
        }
    };

    newId = new URL(window.location.href).searchParams.get("id");

    async getProductById(newId) {
        try {
            let res = await fetch("http://localhost:3000/api/products/"+ newId);
            return res.json();
        }
        catch (err) {
            console.log(err);
        }
    };    
};




