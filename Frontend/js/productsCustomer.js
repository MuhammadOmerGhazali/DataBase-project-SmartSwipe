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
            <a href="/Frontend/html/Customer/sproduct.html?id=${product.ProductID}" onclick="viewProductDetails(${product.ProductID}); return false;">
            <img src="${product.ProductImage}" style="width: 92%;" alt="">
            </a>

            
            <div>
                <span>${product.Category}</span>
                <a onclick="viewProductDetails(${product.ProductID})"><h5>${product.Title}</h5></a>
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


function viewProductDetails(productId) {
    // Open product detail page in a new tab or window
    const productDetailUrl = `/Frontend/html/Customer/sproducts.html?id=${productId}`;
    window.open(productDetailUrl, '_blank');
}