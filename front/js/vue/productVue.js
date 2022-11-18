import GlobalCtrl from "../controller/globalCtrl.js";
export default class ProductVue {
// Crée une nouvelle instance de la classe importée GlobalCtrl afin de pouvoir en appeler des méthodes :
    globalController = new GlobalCtrl();

    /**
     * Affiche plusieurs éléments dans le DOM afin de voir clairement les détails de chaque produit.
     * @param { Object } product Comme la méthode sera appelée depuis le controleur (lui-même relié au modèle), {product} sera la liste des produits liés à leur Id récupérée dans l'API...
     */
    showProductDetail(product) {

    // Ajuste le titre de la page avec le nom du produit :
        document.title = product.name;
    // Cible l'endroit où on veut commencer notre ajout :
        const itemImg = document.querySelector(".item__img");
    // Insère une <image> à l'intérieur de notre balise HTML en lui définissant les attributs "src" et "alt" : 
        const image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        itemImg.appendChild(image);
    // Cible l'endroit où on veut insérer le titre :
        const title = document.querySelector("#title");
        title.textContent = product.name;
    // Cible l'endroit où on veut insérer le prix :
        const price = document.querySelector("#price");
        price.textContent = product.price;
    // Cible l'endroit où on veut insérer la description du produit :
        const description = document.querySelector("#description");
        description.textContent = product.description;
    // Cible l'endroit où on veut insérer les couleurs disponibles pour chaque produit :
        const colors = document.querySelector("#colors");
        for (let i=0; i < product.colors.length; i++) {
        // Insère un élément <option> et parcourt les couleurs disponibles pour chaque produit afin de les incrémenter :
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.textContent = product.colors[i];
            colors.appendChild(color);
        }
    // Initie la méthode suivante pour qu'elle s'applique à la fin de celle-ci sans avoir à l'appeler depuis le controleur :
        this.saveProductInBasket(product);
    };

    /**
     * Initie une écoute au clic d'un bouton afin de récupérer le produit à stocker dans le panier.
     * @param { Object } product 
     */
    saveProductInBasket(product) { 
    
    // Cible l'endroit où placer l'écoute :
        const btn_addToCart = document.querySelector("#addToCart");
        btn_addToCart.addEventListener("click", ()=>{
        // Initie les valeurs à récupérer sur le DOM :
            const colors = document.querySelector("#colors");
            const colorChoice = colors.value;
            const qttyRequired = document.querySelector("#quantity");
            const qttyChoice = qttyRequired.value;
        // Déclare un objet JSON à enregistrer dans le panier avec les données souhaitées :
            let productToSave = {
                productId : product._id,
                productColor : colorChoice,
                productQtty : qttyChoice, 
                productName : product.name,
                productImgUrl : product.imageUrl,
                productAltTxt : product.altTxt            
            };
            if (this.globalController.verifiyCartConditions(productToSave) == 0) {
                alert("Merci de vérifier les options (couleur et/ou quantité) 🙇‍♀️");
            } else {
                this.globalController.saveCartInStorage(productToSave);
            }
        });
    };
};