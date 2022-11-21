import Model from "../model/model.js";
import CartVue from "../vue/cartVue.js";
export default class CartCtrl {
    
    model = new Model();
    vue = new CartVue();
    
    /**
     * Contrôle le panier :
     * Vérifie qu'il ne soit pas vide ;
     * Le cas échéant, récupère les éléments du panier depuis le local storage ;
     * Récupère le prix en appelant model_model_getProductById() l.21;
     * Crée l'objet {productSaved} à partir de ces données ;
     * Calcule la quantité et le prix total ;
     * Passe {productSaved} en paramètre de vue_cartVue_showCart() l.11 puis les totaux à vue_cartVue_showTotalQttyAndPrice() l.95.
     */
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

    /**
     * Contrôle du formulaire en appelant vue_cartVue_getFormEntries() l.108.
     */
    formCtrl() {
        this.vue.getFormEntries();
    }
};

let cart = new CartCtrl();
cart.cartControl();
cart.formCtrl();