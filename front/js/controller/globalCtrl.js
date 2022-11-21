import Model from "../model/model.js";
export default class GlobalCtrl {

    model = new Model();

    /**
     * Enregistre le produit souhaité dans le panier après plusieurs vérifications.
     * À un {product} passé en paramètre dans vue_productVue_saveProductInBasket() l.47_69 :
     * Vérifie si un panier existe déjà ou non ;
     * Le cas contraire, en crée un ;
     * Le cas échéant, vérifie si un même produit de même couleur existe dans le panier ;
     * Le cas échéant, modifie la quantité requise (en additionant la nouvelle à l'ancienne);
     * Le cas contraire, ajoute le produit au panier.
     * @param { Object } product 
     */
    saveCartInStorage(product) {
        if ((localStorage.getItem("cart")) == null){
            let productsInCart = [];
            productsInCart.push(product);
            localStorage.setItem("cart", JSON.stringify(productsInCart));
            alert("Le produit est ajouté au panier !");
        } else {
            let productsInCart = JSON.parse(localStorage.getItem("cart"));            
            let foundProduct = productsInCart.find((el) => el.productId === product.productId && el.productColor === product.productColor);
            if (foundProduct != undefined){
                const newProductInCart = productsInCart.map((el) => {
                    if (el.productId === product.productId && el.productColor === product.productColor) {
                        el.productQtty = JSON.parse(el.productQtty) + JSON.parse(product.productQtty);
                        return el;
                    } else {
                        return el;
                    }                
                });
                localStorage.setItem("cart", JSON.stringify(newProductInCart));
                alert("Le produit est ajouté au panier !");
            } else {
                productsInCart.push(product);
                localStorage.setItem("cart", JSON.stringify(productsInCart));
                alert("Le produit est ajouté au panier !");
            }            
        }
    }

    /**
     * Vérifie les valeurs saisies par l'utilisateur.
     * À un {product} passé en paramètre dans vue_productVue_saveProductInBasket() l.47_66 ;
     * Retourne un booléen duquel dépendra la diffusion d'une alerte ou l'application de la méthode citée ci-dessus.
     * @param { Object } product 
     * @returns { Boolean }
     */
    verifiyCartConditions(product) {
        if (product.productQtty <= 0 || product.productQtty > 100 || !Number.isInteger(JSON.parse(product.productQtty)) || product.productQtty == NaN || product.productColor == 0){
            return 0;
        } else {
            let productsInCart = JSON.parse(localStorage.getItem("cart"));
            if (productsInCart != null){
                let foundProduct = productsInCart.find((el) => el.productId === product.productId && el.productColor === product.productColor);
                if (foundProduct != undefined){
                    const totalQtty = JSON.parse(foundProduct.productQtty) + JSON.parse(product.productQtty);
                    if (totalQtty > 100){
                        return 0;
                    }
                }
            }
        }
        return 1;
    }

    /**
     * Supprime un produit du panier en tenant compte de sa couleur.
     * À un {product} passé en paramètre dans vue_cartVue_showCart l.11, lors du clic l.86 :
     * Parcourt les produits du panier pour supprimer toutes les références identiques ;
     * Sauvegarde le panier à jour ;
     * Recharge la page afin de mettre la vue à jour.
     * @param { String } productId 
     * @param { String } productColor 
     */
    removeProduct(productId, productColor) {
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        productsInCart = productsInCart.filter((el) => {
            if (el.productId != productId || el.productColor != productColor) {
                return el;
            }                
        });            
        localStorage.setItem("cart", JSON.stringify(productsInCart));
        alert("Le produit est supprimé du panier !");
        document.location.reload();        
    }

    /**
     * Ajuste la quantité de produit désirée depuis la page panier après plusieurs vérifications.
     * À un {product} passé en paramètre dans vue_cartVue_showCart l.11, lors de la perte du focus de l'input l.64_74 :
     * Parcourt le panier pour trouver le produit désiré ;
     * Applique la méthode verifiyCartConditions() l.50 à la nouvelle quantité ;
     * Si elle est viable, remplace l'ancienne quantité par la nouvelle ;
     * Sauvegarde le panier à jour ;
     * Recharge la page afin de mettre la vue à jour.
     * @param { String } productId 
     * @param { String } productColor 
     * @param { Number } inputQtty 
     */
    adjustQuantity(productId, productColor, inputQtty) {
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        let foundProduct = productsInCart.find((el) => el.productId === productId && el.productColor === productColor);
        if (foundProduct != undefined){
            foundProduct.productQtty = inputQtty;
            this.verifiyCartConditions(foundProduct);
            if (this.verifiyCartConditions(foundProduct) == 0){
                alert("La quantité doit être comprise entre 1 et 100 !");
                this.removeProduct(productId, productColor);
            } else {
                localStorage.setItem("cart", JSON.stringify(productsInCart));
                alert("Le panier a été modifié !");
                document.location.reload();
            }
        }
    }

    /**
     * Vérifie que les données saisies dans le formulaire (cf vue_cartVue_getFormEntries() l.109) correspondent à nos attentes.
     * @param { String } inputFirstName 
     * @returns { Boolean }
     */
    verifyFirstName(inputFirstName) {
        const firstName = inputFirstName.value;
        let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
        if (/^[a-zA-Zàâäéèêëïîôöùûüÿç '.-]{2,31}$/.test(firstName)) {// (La regex : ^\p{L}.{2,}$ accepte tous les alphabets et tous les caractères mais c'est trop...)
            firstNameErrorMsg.textContent = "";
            return 1;
        } else {      
            firstNameErrorMsg.textContent = "Merci de saisir un prénom valide : point, tiret, apostrophe et espace sont les seuls caractères spéciaux acceptés...";
            inputFirstName.value = ''
        }
    }

    /**
     * Vérifie que les données saisies dans le formulaire (cf vue_cartVue_getFormEntries() l.109) correspondent à nos attentes.
     * @param { String } inputLastName 
     * @returns { Boolean }
     */
     verifyLastName(inputLastName) {
        const lastName = inputLastName.value;
        let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
        if (/^[a-zA-Zàâäéèêëïîôöùûüÿç '.-]{2,31}$/.test(lastName)) {
            lastNameErrorMsg.textContent = "";
            return 1;
        } else {      
            lastNameErrorMsg.textContent = "Merci de saisir un nom valide : point, tiret, apostrophe et espace sont les seuls caractères spéciaux acceptés...";
            inputLastName.value = ''
        }
    }

    /**
     * Vérifie que les données saisies dans le formulaire (cf vue_cartVue_getFormEntries() l.109) correspondent à nos attentes.
     * @param { String } inputAddress 
     * @returns { Boolean }
     */
     verifyAddress(inputAddress) {
        const address = inputAddress.value;
        let addressErrorMsg = document.querySelector("#addressErrorMsg");
        if (/^[a-zA-Z0-9\sàâäéèêëïîôöùûüÿç,.'-]*$/.test(address)) {
            addressErrorMsg.textContent = "";
            return 1;
        } else {      
            addressErrorMsg.textContent = "Merci de saisir une adresse valide : point, virgule, tiret, apostrophe et espace sont les seuls caractères spéciaux acceptés...";
            inputAddress.value = ''
        }
    }
    
    /**
     * Vérifie que les données saisies dans le formulaire (cf vue_cartVue_getFormEntries() l.109) correspondent à nos attentes.
     * @param { String } inputCity 
     * @returns { Boolean }
     */
     verifyCity(inputCity) {
        const city = inputCity.value;
        let cityErrorMsg = document.querySelector("#cityErrorMsg");
        if (/^[a-zA-Z0-9\sàâäéèêëïîôöùûüÿç.'-]*$/.test(city)) {
            cityErrorMsg.textContent = "";
            return 1;
        } else {     
            cityErrorMsg.textContent = "Merci de saisir une ville valide : point, tiret, apostrophe et espace sont les seuls caractères spéciaux acceptés...";
            inputCity.value = ''
        }
    }
        
    /**
     * Vérifie que les données saisies dans le formulaire (cf vue_cartVue_getFormEntries() l.109) correspondent à nos attentes.
     * @param { String } inputEmail
     * @returns { Boolean }
     */
     verifyEmail(inputEmail) {
        const email = inputEmail.value;
        let emailErrorMsg = document.querySelector("#emailErrorMsg");
        if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,}$/.test(email)) {
            emailErrorMsg.innerText = "";
            return 1;
        } else {      
            emailErrorMsg.innerText = "Erreur ! Email non valide";
            inputEmail.value = ''
        }
    }

    /**
     * Valide la commande après plusieurs vérifications.
     * À l'application de vue_cartVue_getFormEntries() l.108_131 ;
     * Vérifie qu'un panier existe bien ;
     * Le cas échéant, récupère les données utilisateur (en vérifiant qu'aucun champs ne soit vide) ;
     * Attend la réponse de l'API (cf model_model_postOrder() l.35) avec les données utilisateur passées en paramètre ;
     * Envoie l'utilisateur sur la page confirmation correspondant à sa commande.
     * @param { String } firstName 
     * @param { String } lastName 
     * @param { String } address 
     * @param { String } city 
     * @param { String } email 
     */
    async confirmOrder(firstName, lastName, address, city, email) {
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        if (productsInCart == null){
            alert("Votre panier est vide : merci de faire vos achats avant de remplir le formulaire...")
        } else {
            const userData = {
                contact : {
                    firstName : firstName,
                    lastName : lastName,
                    address : address,
                    city : city,
                    email : email
                },
                products : productsInCart.map((product) => product.productId)//le map parcourt chaque élément, renvoie les id et crée un nouveau tableau
            };
            const userDataArray = Object.values(userData.contact);
            let correctData = (currentValue) => currentValue != '';
            if (userDataArray.every(correctData) == true){
                const responseOrder = await this.model.postOrder(userData);   
                document.location = "confirmation.html?orderId="+responseOrder.orderId;
            } else {
                alert("Merci de remplir tous les champs du formulaire 🙇‍♀️")
            }
        }
    }
};