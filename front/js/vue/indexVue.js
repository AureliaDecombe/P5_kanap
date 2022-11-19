export default class IndexVue {

    /**
     * Affiche plusieurs éléments dans le DOM afin d'y voir clairement la liste des produits disponibles.
     * @param { Object } productsList Cf controller_indexCtrl_showProducts(), {productsList} sera la liste récupérée dans l'API...
     */
    showProductsList(productsList) {
    
        const section = document.querySelector('.items');               
        productsList.forEach(element => {
        // <a> pour produit cliquable :
            const a = document.createElement("a");
            a.setAttribute("href", `./product.html?id=${element._id}`)
            section.appendChild(a);
        // <article> conteneur :
            const article = document.createElement("article");
            a.appendChild(article);
        // <img> et photo :
            const image = document.createElement("img");
            image.setAttribute("src", `${element.imageUrl}`);
            image.setAttribute("alt", `${element.altTxt}` + "," +`${element.name}`);
            article.appendChild(image);
        // <h3> et nom :
            const titre = document.createElement("h3");
            titre.className = "productName";
            titre.textContent = element.name;
            article.appendChild(titre);
        // <p> et description :
            const p = document.createElement("p");
            p.className = "productDescription";
            p.textContent = element.description;
            article.appendChild(p);            
        });
    };
};