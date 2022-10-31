import Model from "../model/model.js";
import ProductCtrl from "../controller/productCtrl.js";
import ProductVue from "../vue/productVue.js";
import CartVue from "../vue/cartVue.js";

class CartCtrl {
    model = new Model();
    vue = new ProductVue();
    product = new ProductCtrl();
    cartVue = new CartVue();
    cart = {};

    async showCart() {            
        const productsInCart = JSON.parse(localStorage.getItem("cart"));
        for( let i = 0; i < localStorage.length; i++){
            localStorage.key(i);
        }
        console.log("Le panier contient :", localStorage.key, "éléments dont voici le détail :", productsInCart);//à mettre dans cartCtrl          

        this.vue.saveProductsInCart(this.product);
        this.product.saveProductsInBasket(this.product);
    };
};

let cart = new CartCtrl();

cart.showCart();