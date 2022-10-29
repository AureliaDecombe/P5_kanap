import Model from "../model/model.js";
import ProductVue from "../vue/productVue.js";

export default class ProductCtrl {
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

    saveProductsInBasket(productToSave) {
        const colors = document.querySelector("#colors");
        const colorChoice = colors.value;
        const qttyRequired = document.querySelector("#quantity");
        const qttyChoice = qttyRequired.value;
        const productId = this.product._id;                    
        const title = this.vue.showProductDetail.title;
        const image = this.vue.showProductDetail.imageUrl;
        const imageAlt = this.vue.showProductDetail.altTxt;
        const price = this.vue.showProductDetail.price;
        

        if (qttyChoice.value > 0 && qttyChoice.value <=100 && qttyChoice.value != 0 && colorChoice.value != 0) {
            if (localStorage.getItem("cart")) {
                let productsInCart= JSON.parse(localStorage.getItem("cart", productsCart));
                let productsCart = JSON.stringify(productsInCart);
                    console.log(productsCart);

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
                        productName : title,
                        productColor : colorChoice,
                        productQtty : qttyChoice,
                        productImg : image,
                        productImgAlt : imageAlt,
                        productPrice : price
                    };
                    /*const title = this.vue.showProductDetail.title;
                    const actualTitle = title.textContent;
                    const image = this.vue.showProductDetail.imageUrl;
                    const actualImage = image.src;
                    const imageAlt = this.vue.showProductDetail.altTxt;
                    const actualAlt = imageAlt.alt;
                    const price = this.vue.showProductDetail.price;
                    const actualPrice = price.textContent;

                    let productToSave = {
                        productId : product._id,
                        productName : actualTitle,
                        productColor : colorChoice,
                        productQtty : qttyChoice,
                        productImg : actualImage,
                        productImgAlt : actualAlt,
                        productPrice : actualPrice
                    };*/
                        console.log(productToSave);
                                            
                    productsInCart.push(productToSave); 

                }
                localStorage.setItem("cart", productsCart);

                alert("Ajouté au panier !");
            }
        } else {
            let productsInCart = [];

            let productToSave = {
                productId : product._id,
                productName : title,
                productColor : colorChoice,
                productQtty : qttyChoice,
                productImg : image,
                productImgAlt : imageAlt,
                productPrice : price
            };

            productsInCart.push(productToSave);
            
            let productsCart = JSON.stringify(productsInCart);
            localStorage.setItem("cart", productsCart);

            alert("Ajouté au panier !");
        };

        /*let productsInCart = [];
        productsInCart.push(productToSave);
        
        let productsCart = JSON.stringify(productsInCart);
        localStorage.setItem("cart", productsCart);*/

    };
};

let product = new ProductCtrl();

product.showProductById();
product.saveProductsInBasket();
