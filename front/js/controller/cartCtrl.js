

    async showCart() {            
        const productsInCart = JSON.parse(localStorage.getItem("cart"));
        for( let i = 0; i < localStorage.length; i++){
            localStorage.key(i);
        }
        console.log("Le panier contient :", localStorage.key, "éléments dont voici le détail :", productsInCart);//à mettre dans cartCtrl          

        this.vue.saveProductsInCart(this.product);
    };