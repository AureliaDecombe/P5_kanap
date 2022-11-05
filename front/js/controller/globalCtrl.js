export default class GlobalCtrl {
    saveProductsInCart(product) {//product=produit à enregistrer en format JSON 
        if((localStorage.getItem("cart")) == null){//si le panier est vide, j'enregistre qque chose pour la première fois:
            let productsInCart = [];
            productsInCart.push(product);
            localStorage.setItem("cart", JSON.stringify(productsInCart));
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
            }else{
                productsInCart.push(product);
                localStorage.setItem("cart", JSON.stringify(productsInCart));
            }            
        }
    }

    verifiyCompliance(product) {
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
};