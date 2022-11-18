import Model from "../model/model.js";
export default class GlobalCtrl {

    model = new Model();

    saveCartInStorage(product) {
        if ((localStorage.getItem("cart")) == null){
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