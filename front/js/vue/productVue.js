import GlobalCtrl from "../controller/globalCtrl.js";
export default class ProductVue {

    globalController = new GlobalCtrl();

    /**
     * Affiche plusieurs éléments dans le DOM afin d'y voir clairement les détails de chaque produit ;
     * Initie la méthode suivante (cf saveProductInBasket() l.47) pour qu'elle s'applique à la fin de celle-ci sans avoir à l'appeler depuis le controleur.
     * @param { Object } product Cf controller_productCtrl_showProductById(), {product} est un élément de la liste des produits liés à leur Id récupérée dans l'API...
     */
    showProductDetail(product) {
    // Titre de la page :
        document.title = product.name;
        const itemImg = document.querySelector(".item__img");
    // <image> et photo : 
        const image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        itemImg.appendChild(image);
    // Nom dans <h1> :
        const title = document.querySelector("#title");
        title.textContent = product.name;
    // Prix dans <span> :
        const price = document.querySelector("#price");
        price.textContent = product.price;
    // Description dans <p> :
        const description = document.querySelector("#description");
        description.textContent = product.description;
    // Couleurs disponibles dans <option> :
        const colors = document.querySelector("#colors");
        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.textContent = product.colors[i];
            colors.appendChild(color);
        }
        this.saveProductInBasket(product);
    };

    /**
     * Initie une écoute au clic du bonton <ajouter au panier> afin de récupérer le produit désiré ;
     * Crée un objet avec les données requises ;
     * Vérifie leur justesse, cf controller_globalCtrl_verifyCartConditions() l.33 ;
     * Le cas échéant, les enregistre dans le local storage, cf controller_globalCtrl_saveCartInStorage() l.6.
     * @param { Object } product 
     */
    saveProductInBasket(product) {

        const btn_addToCart = document.querySelector("#addToCart");
        btn_addToCart.addEventListener("click", ()=>{

            const colors = document.querySelector("#colors");
            const colorChoice = colors.value;
            const qttyRequired = document.querySelector("#quantity");
            const qttyChoice = qttyRequired.value;
            
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