import Model from "../model/model.js";
import ProductVue from "../vue/productVue.js";
export default class ProductCtrl {
    
    model = new Model();
    vue = new ProductVue();
    product = {};

    /**
     * Récupère l'id du produit visionné ;
     * Associe cette id aux données récupérées dans l'API, cf model_model_getProductById() l.21 et crée un objet {product} ;
     * Passe {product} en paramètre de la méthode vue_productVue_showProductDetail() l.11.
     */
    async showProductById() {          
        var params = (new URL(document.location)).searchParams; 
        if (params.has('id')) {
            const idProduct = params.get('id');
            this.product = await this.model.getProductById(idProduct);
            this.vue.showProductDetail(this.product);
        };        
    };
};

let product = new ProductCtrl();
product.showProductById();