import GlobalCtrl from "../controller/globalCtrl.js";
export default class CartVue {
    globalController = new GlobalCtrl();

    showCart (product) {
        if(JSON.parse(localStorage.getItem("cart")) == null || (JSON.parse(localStorage.getItem("cart")) && JSON.parse(localStorage.getItem("cart")).length == 0)){           
            alert("Votre panier est vide 🤷‍♀️")//pas urgent !!!
        }else{
            console.log("Voici le produit courant :", product);            
            const section = document.querySelector('#cart__items');
            const article = document.createElement("article");
            section.appendChild(article);
            article.className = "cart__item";
            article.setAttribute("data-id", `./product.html?id=${product.productId}`);
            article.setAttribute("data-color", `./product.html?color=${product.productColor}`);
            let divImg = document.createElement("div");
            divImg.className = "cart__item__img";
            article.appendChild(divImg);
            const image = document.createElement("img");
            image.setAttribute("src", `${product.productImgUrl}`);
            image.setAttribute("alt", `${product.productAltTxt}` + "," +`${product.productName}`);
            divImg.appendChild(image);
            let divContent = document.createElement("div");
            divContent.className = "cart__item__content";
            article.appendChild(divContent);
            let divDescription = document.createElement("div");
            divDescription.className = "cart__item__content__description";
            divContent.appendChild(divDescription);
            const pTitle = document.createElement("h2");
            pTitle.textContent = product.productName;
            divDescription.appendChild(pTitle);
            const pColor = document.createElement("p");
            pColor.textContent = product.productColor;
            divDescription.appendChild(pColor);
            const pPrice = document.createElement("p");
            pPrice.textContent = product.price;
            divDescription.appendChild(pPrice);
            const spanPriceValue = document.createElement("span");
            spanPriceValue.textContent = " €";
            pPrice.appendChild(spanPriceValue);
            let divSettings = document.createElement("div");
            divSettings.className = "cart__item__content__settings";
            divContent.appendChild(divSettings);
            let divQuantity = document.createElement("div");
            divQuantity.className = "cart__item__content__settings__quantity";
            divSettings.appendChild(divQuantity);
            const pQuantity = document.createElement("p");
            pQuantity.textContent = "Qté : ";
            divQuantity.appendChild(pQuantity);
            const input = document.createElement("input");
            input.className = "itemQuantity";
            input.type = Number;
            input.name = "itemQuantity";
            input.min = 1;
            input.max = 100;
            input.value = product.productQtty;
            divQuantity.appendChild(input);
            let divDelete = document.createElement("div");
            divDelete.className = "cart__item__content__settings__delete";
            divSettings.appendChild(divDelete);
            const pDeleteItem = document.createElement("p");
            pDeleteItem.className = "deleteItem";
            pDeleteItem.textContent = "Supprimer";
            divDelete.appendChild(pDeleteItem);
            pDeleteItem.addEventListener("click", () => {
                console.log("id du produit à supprimer " + product.productId, product.productColor);
                this.globalController.removeProduct(product.productId, product.productColor);
            });
        }
    }

    showTotalQttyAndPrice (totalPrice, totalQtty) {
        const price = document.querySelector("#totalPrice");
        price.textContent = totalPrice;
        const quantity = document.querySelector("#totalQuantity");
        quantity.textContent = totalQtty;

    }

    adjustQuantityFromBasket(){//insérer eventlistener dans showcart (penser à réutiliser verifyconditions puis envoyer simplement au global)
        const input_qtty = document.querySelector(".itemQuantity");
        input_qtty.addEventListener("change", (itemQuantity) => {
            const productToGet = document.querySelector(".cart__item");
            const productId = productToGet.dataset.id;
            const idToGet = productId.value;
            const productColor = productToGet.dataset.color;
            const colorToGet = productColor.value;
            const productQtty = document.querySelector(".itemQuantity");
            const newQtty = productQtty.value;
            let qttyToAdjust = {
                productId : idToGet,
                productColor : colorToGet,
                productQtty : newQtty
            };
            console.log("Produit à modifier :", qttyToAdjust);
            this.globalController.adjustQuantity(qttyToAdjust);
        });
    }
};