import Model from "../model/model.js";
import IndexVue from "../vue/indexVue.js";
class IndexCtrl {
    
    model = new Model();
    vue = new IndexVue();

    /**
     * Récupère la liste des produits disponibles, cf model_model_getProductsList ;
     * Passe {productsList} en paramètre de la méthode vue_indexVue_showProductsList().
     */
    async showProducts() {
        const productsList = await this.model.getProductsList()
        this.vue.showProductsList(productsList);
    };
};

let index = new IndexCtrl();
index.showProducts();