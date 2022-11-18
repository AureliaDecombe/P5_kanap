export default class IndexVue {

    /**
     * Affiche plusieurs éléments dans le DOM afin de voir clairement la liste des produits disponibles.
     * @param { Object } listProducts Comme la méthode sera appelée depuis le controleur (lui-même relié au modèle), {listProducts} sera la liste récupérée dans l'API...
     */
    showListProducts(listProducts) {
    // Cible l'endroit où on veut commencer notre ajout :
        const section = document.querySelector('.items');
    // Parcourt le tableau [listProducts] en faisant une boucle pour chaque 'element' et en récupérant si besoin les valeurs associées aux noms (ex : element.name) :               
        listProducts.forEach(element => {
        // Insère une balise <a> à notre <section> en lui définissant l'attribut "href" ainsi que le lien visé :
            const a = document.createElement("a");
            a.setAttribute("href", `./product.html?id=${element._id}`)
            section.appendChild(a);
        // Insère un <article> à l'intérieur de notre <a> :
            const article = document.createElement("article");
            a.appendChild(article);
        // Insère une <image> à l'intérieur de notre <article> en lui définissant les attributs "src" et "alt" :
            const image = document.createElement("img");
            image.setAttribute("src", `${element.imageUrl}`);
            image.setAttribute("alt", `${element.altTxt}` + "," +`${element.name}`);
            article.appendChild(image);
        // Insère un titre <h3> à la suite de l'<image> en lui définissant une classe et un contenu :
            const titre = document.createElement("h3");
            titre.className = "productName";
            titre.textContent = element.name;
            article.appendChild(titre);
        // Insère enfin un paragraphe <p> à la suite du titre en lui définissant une classe et un contenu :
            const p = document.createElement("p");
            p.className = "productDescription";
            p.textContent = element.description;
            article.appendChild(p);            
        });
    };
};