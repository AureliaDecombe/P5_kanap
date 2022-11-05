import Model from "../model/model.js";
import CartVue from "../vue/cartVue.js";

class CartCtrl {
    model = new Model();
    cartVue = new CartVue();//ecrire là-bas méthode qui prend le localstorage en paramètres
    cart = {};

    

    getProductsNumber(){
        let number = 0;
        for(let product of basket){
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

