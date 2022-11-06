import Model from "../model/model.js";
import CartVue from "../vue/cartVue.js";

class CartCtrl {
    model = new Model();
    vue = new CartVue();//ecrire là-bas méthode qui prend le localstorage en paramètres
    
    cartControl() {
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        this.vue.showCart(productsInCart);        
    }

    /*
    removeFromBasket(product){
        this.basket = this.basket.filter(p => p.id != product.id);
        this.saveBasket();
    }

    changeQuantity(product,quantity){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0){
                removeFromBasket(foundProduct);
            }else{
                this.saveBasket();
            }
            if(foundProduct.quantity > 100){
                foundProduct.quantity = 100;
                this.saveBasket();
            }
        }
    }
    
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
    }*/
};

let cart = new CartCtrl();
cart.cartControl();

