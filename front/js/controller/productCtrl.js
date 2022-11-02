import Model from "../model/model.js";
import ProductVue from "../vue/productVue.js";

export default class ProductCtrl {
    model = new Model();
    vue = new ProductVue();
    product = {};

    async showProductById() {          
        var params = (new URL(document.location)).searchParams; 
        if(params.has('id')) {
            const idProduct = params.get('id');
            console.log(idProduct); 
            this.product = await this.model.getProductById(idProduct);
            console.log("Le produit visionné est", this.product);

            this.vue.showProductDetail(this.product);
        };        
    };
};

let product = new ProductCtrl();

product.showProductById();



