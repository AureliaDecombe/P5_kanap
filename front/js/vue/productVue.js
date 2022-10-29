import ProductCtrl from "../controller/productCtrl.js";
export default class ProductVue {
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
        this.saveProductsInCart(product);
    };

    saveProductsInCart(product) {        
        const btn_addToCart = document.querySelector("#addToCart");
        btn_addToCart.addEventListener("click", (e)=>{
            e.stopPropagation;
            e.preventDefault;
            const colors = document.querySelector("#colors");
            const colorChoice = colors.value;
            const qttyRequired = document.querySelector("#quantity");
            const qttyChoice = qttyRequired.value;
            let productToSave = {
                productId : product._id,
                productColor : colorChoice,
                productQtty : qttyChoice,               
            };
            let productController = new ProductCtrl();
            productController.saveProductsInBasket(productToSave);
        });
    };
};
               



//pour afficher le panier, il faut enregistrer tous les éléments dans le local storage depuis cette page !!
//écouter addeventlistener pour renvoyer au controleur
