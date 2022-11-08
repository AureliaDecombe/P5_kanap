import Model from "../model/model.js";
import CartVue from "../vue/cartVue.js";

export default class CartCtrl {
    model = new Model();
    vue = new CartVue();//ecrire là-bas méthode qui prend le localstorage en paramètres
    
    cartControl() {
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        let totalPrice = 0;
        let totalQtty = 0;
        if (productsInCart != null) {
            productsInCart.forEach(async element => {
                let productSaved = {
                    productId : element.productId,
                    productColor : element.productColor,
                    productQtty : Number(element.productQtty), 
                    productName : element.productName,
                    productImgUrl : element.productImgUrl,
                    productAltTxt : element.productAltTxt,
                    price : 0            
                };
                const initProduct = await this.model.getProductById(element.productId);
                productSaved.price = initProduct.price;
                totalPrice += productSaved.productQtty * Number(initProduct.price);
                totalQtty += productSaved.productQtty;
                this.vue.showCart(productSaved);
                this.vue.showTotalQttyAndPrice(totalPrice, totalQtty);
            });
            //this.vue.removeFromBasket(productsInCart);
            //this.vue.adjustQuantityFromBasket(productsInCart);     
        }
               
    }
};

let cart = new CartCtrl();
cart.cartControl();

/**
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
    } */
