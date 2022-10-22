import Model from "../model/model.js";
import IndexVue from "../vue/indexVue.js";

class IndexCtrl {
    model = new Model();
    vue = new IndexVue();

    async showProducts() {
        const listProducts = await this.model.getListProducts()
        console.log("Liste des produits récupérés dans le modèle :", await this.model.getListProducts());
        
        this.vue.showListProducts(listProducts);
    };

    async showProductById() {        
        console.log("Le produit avec l'id 8906dfda133f4c20a9d0e34f18adcf06 est", await this.model.getProductById("8906dfda133f4c20a9d0e34f18adcf06"));
    };
};

let index = new IndexCtrl();
index.showProducts();
index.showProductById();

