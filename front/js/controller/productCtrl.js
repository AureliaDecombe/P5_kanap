import Model from "../model/model.js";
import ProductVue from "../vue/productVue.js";

class ProductCtrl {
    model = new Model();
    vue = new ProductVue();
    product = {};

    async showProductById() {          
        var params = (new URL(document.location)).searchParams; 
        if(params.has('id')) {
            const idProduct = params.get('id');
            console.log(idProduct); 
            this.product = await this.model.getProductById(idProduct);
            console.log("Le produit visionné est", this.product);

            this.vue.showProductDetail(this.product);
        };        
    };

    /*saveProductsInBasket(product) {
        const colorChoice = colors.value;
        const qttyRequired = document.querySelector("#quantity");
        const qttyChoice = qttyRequired.value; 
        const productId = product._id;                   
        const titleChoice = title.textContent;
        const image = this.product.imageUrl;
        const imageAlt = this.product.altTxt;
        const price = this.product.price;       

        if (qttyChoice.value > 0 && qttyChoice.value <=100 && qttyChoice.value != 0 && colorChoice.value != 0) {
            if (localStorage.getItem("cart")) {
                let productsInCart= JSON.parse(localStorage.getItem("cart", productsCart));
                let productsCart = JSON.stringify(productsInCart);
                    console.log("productsCart est", productsCart);

                const existingCart = productsInCart.find((el) => el.productId === productId && el.colorChoice === colorChoice);
                    console.log("existing cart est", existingCart);

                if(existingCart) {
                    let newQtty = parseInt(qttyChoice) + parseInt(existingCart.qttyChoice);
                        console.log("newQtty =", newQtty);
                    existingCart.qttyChoice = newQtty;
                    localStorage.setItem("cart", productsCart);
                        console.log("productsCart est égal à", productsCart);
                } else {
                    let productsInCart= JSON.parse(localStorage.getItem("cart", productsCart));
                        console.log(productsCart);
                     
                    let productToSave = {
                        productId : product._id,
                        productName : titleChoice,
                        productColor : colorChoice,
                        productQtty : qttyChoice,
                        productImg : image,
                        productImgAlt : imageAlt,
                        productPrice : price
                    };
                        console.log(productToSave);
                                            
                    productsInCart.push(productToSave); 

                }
                localStorage.setItem("cart", productsCart);
                    console.log("Ajouté au panier !");
            }
        } else { 
            let productsInCart = [];

            let productToSave = {
                product_Id : productId,
                productName : titleChoice,
                productColor : colorChoice,
                productQtty : qttyChoice,
                productImg : image,
                productImgAlt : imageAlt,
                productPrice : price
            }
            
            productsInCart.push(productToSave);
            console.log("productsInCart est", productsInCart);
            
            let productsCart = JSON.stringify(productsInCart);
            localStorage.setItem("cart", productsCart);
                console.log("productsCart est", productsCart);
                //console.log("Ajouté au panier !");
        };
        

        /*let productsInCart = [];
        productsInCart.push(productToSave);
        
        let productsCart = JSON.stringify(productsInCart);
        localStorage.setItem("cart", productsCart);

    };*/
};
export default class Basket{
    model = new Model();
    vue = new ProductVue();
    product = {};

    constructor(){  
        let basket = localStorage.getItem("basket");
        if(basket == null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }

    saveBasket(){
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    addBasket(product){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity++;
        }else{
            product.quantity = 1;
            this.basket.push(product);
        }
        this.saveBasket();
    }

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
}

let product = new ProductCtrl();

product.showProductById();
this.basket.saveBasket();
