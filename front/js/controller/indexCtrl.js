import Model from "../model/model.js";
import IndexVue from "../vue/indexVue.js";

class IndexCtrl {
    model = new Model();
    vue = new IndexVue();

    async showProduct() {
        const listProducts = await this.model.getListProducts()
        console.log("Liste des produits récupérés dans le modèle :", await this.model.getListProducts());
        
        console.log("Le canapé ayant l'id 107fb5b75607497b96722bda5b504926 est celui-ci : ", await listProducts[0]);//choper par l'id ??

        this.vue.showListProducts(listProducts);
    }
};

let index = new IndexCtrl();
index.showProduct();

