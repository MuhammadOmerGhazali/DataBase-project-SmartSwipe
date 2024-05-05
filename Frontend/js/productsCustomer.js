const productsUrl = 'http://localhost:5000/api/products';
const productsBody = document.querySelector('.pro-container')
let output = ''
fetch(productsUrl)
    .then(res => res.json())
    .then(data =>
        renderProducts(data)
    );


    const renderProducts = (products) => {
        products.forEach(product => {
    
            const encodedProductId = encodeURIComponent(product.ProductID); 
            output += `
            <div class="pro">
            <a href="/Frontend/html/Customer/${product.ProductID}">
            <a href="/Frontend/html/Customer/${product.ProductID}">
            <img src="${product.ProductImage}" style="width: 92%;" alt="">
            </a>
            <div>
                <span>${product.Category}</span>
                <a href="/Frontend/html/Customer/${product.ProductID}"><h5>${product.Title}</h5></a>
                <div class="star">
                    <img src="/Frontend/img/star_shiny.png">
                    <img src="/Frontend/img/star_shiny.png">
                    <img src="/Frontend/img/star_shiny.png">
                    <img src="/Frontend/img/star_shiny.png">
                    <img src="/Frontend/img/star_shiny.png">
                </div>
                <h4>$${product.Price}</h4>
            </div>
            <a href="#"><img src="/Frontend/img/shopping-cart.png"></a></a>
        </div>
            `;
        });
        productsBody.innerHTML = output;
    }