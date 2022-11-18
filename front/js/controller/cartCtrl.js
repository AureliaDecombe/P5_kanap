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
        } if (productsInCart == null || productsInCart.length == 0) {
            alert("Votre panier est vide, veuillez tout d'abord poursuivre vos achats...")
        }               
    }

    formCtrl() {
        this.vue.getFormEntries();
    }
};

let cart = new CartCtrl();
cart.cartControl();
cart.formCtrl();