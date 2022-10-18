export default class IndexVue {
    showListProducts(listProducts) {
        const article = document.querySelector('.items');
        listProducts.forEach(element => {/**utiliser createElement.appendChild */ 
            article.innerHTML+= `<a href="./product.html?id=42"><article><img src="${element.imageUrl}" alt="${element.altTxt}, ${element.name}">
                <h3 class="productName">${element.name}</h3>
                <p class="productDescription">${element.description}</p>
                </article>
            </a>`;
        }); 
    }
};