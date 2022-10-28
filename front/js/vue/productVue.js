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
    };

    showCartArray(product) {        
        const quantityChosen = document.querySelector("#quantity");
        const btn_addToCart = document.querySelector("#addToCart");
        btn_addToCart.addEventListener("click", (e)=>{
            e.preventDefault();//la page ne s'actualise pas quand on clique
            const colorChoice = colors.value;
            const quantityChoice = quantityChosen.value;
            let cartArray = {
                productName : title.productName,
                productId : product._id,
                productColor : colorChoice,
                productQuantity : quantityChoice,
                productPrice : price
            };
        });
    };
};
               



//pour afficher le panier, il faut enregistrer tous les éléments dans le local storage depuis cette page !!
//écouter addeventlistener pour renvoyer au controleur
