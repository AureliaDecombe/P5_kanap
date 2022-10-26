export default class ProductVue {
    showProductDetail(product) {
        document.title = product.name;
        const itemImg = document.querySelector(".item__img");
        const image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        itemImg.appendChild(image);
    };
};

//pour afficher le panier, il faut enregistrer tous les éléments dans le local storage depuis cette page !!
//écouter addeventlistener pour renvoyer au controleur
