import Model from "../model/model.js";
import ProductVue from "../vue/productVue.js";

class ProductCtrl {
    model = new Model();
    vue = new ProductVue();
    product = {};

    async showProductById() {          
        var params = (new URL(document.location)).searchParams; 
        if(params.has('id')) {
            const idProduct = params.get('id');
            console.log(idProduct); 
            this.product = await this.model.getProductById(idProduct);
            console.log("Ce produit est :", this.product);
            
            this.vue.showProductDetail(this.product);
        };        
    };
}

let productClass = new ProductCtrl();

productClass.showProductById();