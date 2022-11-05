export default class CartVue {
    showCart (localStorage) {
        if((localStorage.getItem("cart")) != null){
            const productsInCart = JSON.parse(localStorage.getItem("cart"));
            const section = document.querySelector('#cart__items')
            productsInCart.forEach(element => {
                const article = document.createElement("article");
                section.appendChild(article);
                article.className = "cart__item";
                article.setAttribute("data-id", `./product.html?id=${element._id}`)
                let divImg = document.createElement("div");
                divImg.className = "cart__item__img";
                article.appendChild(divImg);
                const image = document.createElement("img");
                image.setAttribute("src", `${element.imageUrl}`);
                image.setAttribute("alt", `${element.altTxt}` + "," +`${element.name}`);
                divImg.appendChild(image);
                let divContent = document.createElement("div");
                divContent.className = "cart__item__content";
                article.appendChild(divContent);
                let divDescription = document.createElement("div");
                divDescription.className = "cart__item__content__description";
                divContent.appendChild(divDescription);
                const pTitle = document.createElement("h2");
                pTitle.textContent = element.name;
                divDescription.appendChild(pTitle);
                const pColor = document.createElement("p");
                pColor.textContent = element.color;
                divDescription.appendChild(pColor);
                const pPrice = document.createElement("p");
                pPrice.textContent = element.price;
                divDescription.appendChild(pPrice);
                let divSettings = document.createElement("div");
                divSettings.className = "cart__item__content__settings";
                divContent.appendChild(divSettings);
                let divQuantity = document.createElement("div");
                divQuantity.className = "cart__item__content__settings__quantity";
                divSettings.appendChild(divQuantity);
                const pQuantity = document.createElement("p");
                pQuantity.textContent = "Qté : ", `${element.qtty}`;
                divQuantity.appendChild(pQuantity);
                const input = document.createElement("input");
                input.className = "itemQuantity";
                input.type = Number;
                input.name = "itemQuantity";
                input.min = 1;
                input.max = 100;
                input.value = "";
                divQuantity.appendChild(input);
                let divDelete = document.createElement("div");
                divDelete.className = "cart__item__content__settings__delete";
                divSettings.appendChild(divDelete);
                const pDeleteItem = document.createElement("p");
                pDeleteItem.className = "deleteItem";
                pDeleteItem.textContent = "Supprimer";
                divDelete.appendChild(pDeleteItem);        
            });           
        }else{
            alert("Votre panier est vide 🤷‍♀️")
        }
    }
};