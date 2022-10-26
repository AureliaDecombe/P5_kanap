export default class IndexVue {
    showListProducts(listProducts) {
        const section = document.querySelector('.items');
        
        listProducts.forEach(element => {
            const a = document.createElement("a");
            a.setAttribute("href", `./product.html?id=${element._id}`)
            section.appendChild(a);
            const article = document.createElement("article");
            a.appendChild(article);
            const image = document.createElement("img");
            image.setAttribute("src", `${element.imageUrl}`);
            image.setAttribute("alt", `${element.altTxt}` + "," +`${element.name}`);
            article.appendChild(image);
            const titre = document.createElement("h3");
            titre.className = "productName";
            titre.innerText = element.name;
            article.appendChild(titre);
            const p = document.createElement("p");
            p.className = "productDescription";
            p.innerText = element.description;
            article.appendChild(p);            
        }); 
    }
};