//import CartCtrl from "./cartCtrl.js";
export default class GlobalCtrl {
    //cartCtrl = new CartCtrl();

    saveProductsInCart(product) {//product=produit à enregistrer en format JSON 
        if((localStorage.getItem("cart")) == null){//si le panier est vide, j'enregistre qque chose pour la première fois:
            let productsInCart = [];
            productsInCart.push(product);
            localStorage.setItem("cart", JSON.stringify(productsInCart));
            alert("Le produit est ajouté au panier !");
                //console.log("Ajouté au panier !");
        }else{//si un panier existe
            let productsInCart = JSON.parse(localStorage.getItem("cart"));            
            let foundProduct = productsInCart.find((el) => el.productId === product.productId && el.productColor === product.productColor);
            if(foundProduct != undefined){
                const newProductInCart = productsInCart.map((el) => {
                    if (el.productId === product.productId && el.productColor === product.productColor) {
                        el.productQtty = JSON.parse(el.productQtty) + JSON.parse(product.productQtty);
                        return el;
                    } else {
                        return el;
                    }                
                });
                localStorage.setItem("cart", JSON.stringify(newProductInCart));
                alert("Le produit est ajouté au panier !");
            }else{
                productsInCart.push(product);
                localStorage.setItem("cart", JSON.stringify(productsInCart));
                alert("Le produit est ajouté au panier !");
            }            
        }
    }

    verifiyConditions(product) {
        if(JSON.parse(product.productQtty) <= 0 || JSON.parse(product.productQtty) > 100 || !Number.isInteger(JSON.parse(product.productQtty)) || product.productColor == 0){
            return 0;
        }else{
            let productsInCart = JSON.parse(localStorage.getItem("cart"));
            if (productsInCart != null){
                let foundProduct = productsInCart.find((el) => el.productId === product.productId && el.productColor === product.productColor);
                if(foundProduct != undefined){
                    const totalQtty = JSON.parse(foundProduct.productQtty) + JSON.parse(product.productQtty);
                    if(totalQtty > 100){
                        return 0;
                    }
                }
            }
        }
        return 1;
    }

    removeProduct(productId, productColor){
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        productsInCart = productsInCart.filter((el) => {
            if (el.productId != productId || el.productColor != productColor) {
                return el;
            }                
        });            
        localStorage.setItem("cart", JSON.stringify(productsInCart));
        alert("Le produit est supprimé du panier !");
        document.location.reload();//méthode facile
        //this.cartCtrl.cartControl();        
    }

    adjustQuantity(productId, productColor, inputQtty){
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        let foundProduct = productsInCart.find((el) => el.productId === productId && el.productColor === productColor);
        if(foundProduct != undefined){
            foundProduct.productQtty = inputQtty;
            this.verifiyConditions(foundProduct);
            if(this.verifiyConditions(foundProduct) == 0){
                alert("La quantité doit être comprise entre 1 et 100, le produit est supprimé du panier.");
                this.removeProduct(productId, productColor);
            }else{
                localStorage.setItem("cart", JSON.stringify(productsInCart));
                alert("Le panier a été modifié !");
                document.location.reload();
            }
        };
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

//modifier quantité(si trop dur, je zappe)
//controler formulaire
//passer commande