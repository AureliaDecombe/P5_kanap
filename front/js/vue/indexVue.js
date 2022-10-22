export default class IndexVue {
    showListProducts(listProducts) {
        const article = document.querySelector('.items');
        const newProduct = document.createElement("a");
        article.appendChild(newProduct);

        listProducts.forEach(element => {
            newProduct.innerHTML += 
                `<a href="./product.html?id=${element._id}">
                    <article>
                        <img src="${element.imageUrl}" alt="${element.altTxt}, ${element.name}">
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                    </article>
                </a>`;
        }); 
    }
};