import Model from "../model/model.js";
import IndexVue from "../vue/indexVue.js";

class IndexCtrl {
    model = new Model();
    vue = new IndexVue();

    async showProducts() {
        const listProducts = await this.model.getListProducts()
        console.log("Liste des produits récupérés dans le modèle :", listProducts);
        
        this.vue.showListProducts(listProducts);
    };
};

let index = new IndexCtrl();
index.showProducts();

