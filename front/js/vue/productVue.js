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
                productAltTxt : product.altTxt,
                productPrice : product.price            
            };
            console.log("Product to save :", productToSave);
            if (this.globalController.verifiyCompliance(productToSave) == 0) {
                alert("Merci de vérifier les options (couleur et/ou quantité) 🙇‍♀️");
            } else {
                this.globalController.saveProductsInCart(productToSave);
            }
        });
    };
};