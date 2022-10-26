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

    async getProductById(idProduct) {
        try {
            let res = await fetch("http://localhost:3000/api/products/"+ idProduct);
            return res.json();
        }
        catch (err) {
            console.log(err);
        }
    };    
};




