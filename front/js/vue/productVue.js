import GlobalCtrl from "../controller/globalCtrl.js";
export default class ProductVue {
    //
    constructor(){
        this.globalController = new GlobalCtrl();
    }

    showProductDetail(product) {
        document.title = product.name;
        const itemImg = document.querySelector(".item__img");
        const image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        itemImg.appendChild(image);
        const title = document.querySelector("#title");
        title.textContent = product.name;
        const price = document.querySelector("#price");
        price.textContent = product.price;
        const description = document.querySelector("#description");
        description.textContent = product.description;
        const colors = document.querySelector("#colors");
        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.textContent = product.colors[i];
            colors.appendChild(color);
        }
        //initialisation du listener sur le bouton d'ajout :
        this.saveProductsInBasket(product);
    };

    saveProductsInBasket(product) {        
        const btn_addToCart = document.querySelector("#addToCart");
        btn_addToCart.addEventListener("click", ()=>{
            const colors = document.querySelector("#colors");
            const colorChoice = colors.value;
            const qttyRequired = document.querySelector("#quantity");
            const qttyChoice = qttyRequired.value;
            //déclare un objet JSON à enregistrer ds le panier avec id, couleur et qtté :
            let productToSave = {
                productId : product._id,
                productColor : colorChoice,
                productQtty : JSON.parse(qttyChoice), 
                productName : product.name,
                productImgUrl : product.imageUrl,
                productAltTxt : product.altTxt            
            };
            console.log("pouet", productToSave);
            if (this.globalController.verifiyProductQtty(productToSave) == 0) {
                alert("La quantité doit être comprise entre 1 et 100 !");
            } else {
                this.globalController.saveProductsInCart(productToSave);
            }
        });
    };
};


/*TrainingDev_e-shop__basket :
class CartCtrl{
    getCart(){ 
        let productsInCart = localStorage.getItem("cart");
        if(productsInCart == null){
            this.productsInCart = [];
        }else{
            this.productsInCart = JSON.parse(productsInCart);
        }
    }

    saveCart(){
        localStorage.setItem("cart", JSON.stringify(this.productsInCart));
    }

    addCart(product){
        let foundProduct = this.productsInCart.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity++;
        }else{
            product.quantity = 1;
            this.productsInCart.push(product);
        }
        this.saveCart();
    }

    removeFromCart(product){
        this.productsInCart = this.productsInCart.filter(p => p.id != product.id);
        this.saveCart();
    }

    changeQuantity(product,quantity){
        let foundProduct = this.productsInCart.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0){
                removeFromproductsInCart(foundProduct);
            }else{
                this.saveCart();
            }
            if(foundProduct.quantity > 100){
                foundProduct.quantity = 100;
                this.saveCart();
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
}*/


/*Moi avant training dev :
if (localStorage.getItem("cart")) {
    const colorChoice = colors.value;
    const qttyRequired = document.querySelector("#quantity");
    const qttyChoice = qttyRequired.value; 
    const productId = product.id;                   
    const titleChoice = title.textContent;
    const image = this.product.imageUrl;
    const imageAlt = this.product.altTxt;
    const price = this.product.price; 

    let productsInCart= JSON.parse(localStorage.getItem("cart", cartProducts));
    let cartProducts = JSON.stringify(productsInCart);
        console.log("cartProducts est", cartProducts);

    const existingCart = productsInCart.find((el) => el.productId === productId && el.colorChoice === colorChoice);
        console.log("existing cart est", existingCart);

    if(existingCart) {
        let newQtty = parseInt(qttyChoice) + parseInt(existingCart.qttyChoice);
            console.log("newQtty =", newQtty);
        existingCart.qttyChoice = newQtty;
        localStorage.setItem("cart", cartProducts);
            console.log("cartProducts est égal à", cartProducts);
    } else {
        let productsInCart= JSON.parse(localStorage.getItem("cart", cartProducts));
            console.log(cartProducts);
            
        let productToSave = {
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
    localStorage.setItem("cart", cartProducts);
        console.log("Ajouté au panier !");
} else { 
    let productsInCart = [];

    let productToSave = {
        productName : titleChoice,
        productColor : colorChoice,
        productQtty : qttyChoice,
        productImg : image,
        productImgAlt : imageAlt,
        productPrice : price
    }
    
    productsInCart.push(productToSave);
    console.log("productsInCart est", productsInCart);
    
    let cartProducts = JSON.stringify(productsInCart);
    localStorage.setItem("cart", cartProducts);
        console.log("cartProducts est", cartProducts);
        //console.log("Ajouté au panier !");
};        

/*let productsInCart = [];
productsInCart.push(productToSave);

let cartProducts = JSON.stringify(productsInCart);
localStorage.setItem("cart", cartProducts);
};*/