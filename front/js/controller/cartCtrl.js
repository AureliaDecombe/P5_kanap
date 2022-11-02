import Model from "../model/model.js";
import CartVue from "../vue/cartVue.js";

class CartCtrl {
    model = new Model();
    cartVue = new CartVue();//ecrire là-bas méthode qui prend le localstorage en paramètres
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

    getProductsNumber(){
        let number = 0;
        for(let product of this.basket){
            number += product.quantity;
        }
        return number;
    }

    getTotalPrice(){
        let total = 0;
        for(let product of this.basket){
            total += product.quantity * product.price;
        }
        return total;
    }
};

let cart = new CartCtrl();

cart.showCart();