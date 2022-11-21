import GlobalCtrl from "../controller/globalCtrl.js";
export default class CartVue {
    
    globalController = new GlobalCtrl();

    /**
     * Affiche plusieurs éléments dans le DOM afin d'y voir clairement les produits contenus dans le panier ;
     * Écoute sur le DOM les changements possibles (quantité ou suppression) afin d'ajuster le contenu du panier ;
     * @param { Object } product Cf controller_cartCtrl_cartControl(), {product} sera la liste des produits liés à leur Id récupérée dans l'API...
     */
    showCart (product) {           
        const section = document.querySelector('#cart__items');
    // <article> conteneur :
        const article = document.createElement("article");
        section.appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", `./product.html?id=${product.productId}`);
        article.setAttribute("data-color", `./product.html?color=${product.productColor}`);
    // <div> conteneur :    
        const divImg = document.createElement("div");
        divImg.className = "cart__item__img";
        article.appendChild(divImg);
    // <img> et photo : 
        const image = document.createElement("img");
        image.setAttribute("src", `${product.productImgUrl}`);
        image.setAttribute("alt", `${product.productAltTxt}` + "," +`${product.productName}`);
        divImg.appendChild(image);
    // <div> conteneur :
        const divContent = document.createElement("div");
        divContent.className = "cart__item__content";
        article.appendChild(divContent);
    // <div> pour éléments constants :
        const divDescription = document.createElement("div");
        divDescription.className = "cart__item__content__description";
        divContent.appendChild(divDescription);
    // <p> et nom :
        const pTitle = document.createElement("h2");
        pTitle.textContent = product.productName;
        divDescription.appendChild(pTitle);
    // <p> et couleur :
        const pColor = document.createElement("p");
        pColor.textContent = product.productColor;
        divDescription.appendChild(pColor);
    // <p> et prix unitaire :
        const pPrice = document.createElement("p");
        pPrice.textContent = product.price;
        divDescription.appendChild(pPrice);
    // <span> et devise :
        const spanPriceValue = document.createElement("span");
        spanPriceValue.textContent = " €";
        pPrice.appendChild(spanPriceValue);
    // <div> pour éléments variables :
        const divSettings = document.createElement("div");
        divSettings.className = "cart__item__content__settings";
        divContent.appendChild(divSettings);
    // <div> pour quantité :
        const divQuantity = document.createElement("div");
        divQuantity.className = "cart__item__content__settings__quantity";
        divSettings.appendChild(divQuantity);
    // <p> et définition :
        const pQuantity = document.createElement("p");
        pQuantity.textContent = "Qté : ";
        divQuantity.appendChild(pQuantity);
    // <input> et valeur, cf controller_globalCtrl_adjustQuantity() l.102:
        const inputQtty = document.createElement("input");
        inputQtty.className = "itemQuantity";
        inputQtty.type = Number;
        inputQtty.name = "itemQuantity";
        inputQtty.min = 1;
        inputQtty.max = 100;
        inputQtty.value = product.productQtty;
        divQuantity.appendChild(inputQtty);
        inputQtty.addEventListener("change", () => {
            this.globalController.adjustQuantity(product.productId, product.productColor, inputQtty.value);
        });
    // <div> pour suppression :
        const divDelete = document.createElement("div");
        divDelete.className = "cart__item__content__settings__delete";
        divSettings.appendChild(divDelete);
    // <p> cliquable pour supprimer, cf controller_globalCtrl_removeProduct() l.78:
        const pDeleteItem = document.createElement("p");
        pDeleteItem.className = "deleteItem";
        pDeleteItem.textContent = "Supprimer";
        divDelete.appendChild(pDeleteItem);
        pDeleteItem.addEventListener("click", () => {
            this.globalController.removeProduct(product.productId, product.productColor);
        });
    }

    /**
     * Affiche le nombre de produits dans le panier ainsi que leur prix total.
     * @param { Number } totalPrice Cf controller_cartCtrl_cartControl(), totalPrice est le resultat d'une opération.
     * @param { Number } totalQtty Idem.
     */
    showTotalQttyAndPrice (totalPrice, totalQtty) {
        const price = document.querySelector("#totalPrice");
        price.textContent = totalPrice;
        const quantity = document.querySelector("#totalQuantity");
        quantity.textContent = totalQtty;
    }

    /**
     * Initie l'écoute des données entrées dans le formulaire ;
     * Vérifie pour chaque entrée que le format correspond à nos attentes, cf controller_globalCtrl_verify"each-entry"() l.124 à l.192 ;
     * Initie l'écoute du bouton "commander !" ;
     * Vérifie la conformité du panier et du formulaire grâce à controller_globalCtrl_confirmOrder() l.217;
     */
    getFormEntries () {
        const inputFirstName = document.querySelector("#firstName");
        inputFirstName.addEventListener("change", () => {
            this.globalController.verifyFirstName(inputFirstName)
        });
        const inputLastName = document.querySelector("#lastName");
        inputLastName.addEventListener("change", () => {
            this.globalController.verifyLastName(inputLastName)
        });
        const inputAddress = document.querySelector("#address");
        inputAddress.addEventListener("change", () => {
            this.globalController.verifyAddress(inputAddress)
        });
        const inputCity = document.querySelector("#city");
        inputCity.addEventListener("change", () => {
            this.globalController.verifyCity(inputCity)
        });
        const inputEmail = document.querySelector("#email");
        inputEmail.addEventListener("change", () => {
            this.globalController.verifyEmail(inputEmail)
        })
        const order = document.querySelector("#order");
        order.addEventListener("click", (e) => {
            this.globalController.confirmOrder(inputFirstName.value, inputLastName.value, inputAddress.value, inputCity.value, inputEmail.value);
            e.preventDefault();
        })
    }
};