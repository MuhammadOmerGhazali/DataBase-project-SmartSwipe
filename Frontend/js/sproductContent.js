const productsUrl = 'http://localhost:5000/api/products/';
document.addEventListener('DOMContentLoaded', () => {
    // Extract product ID from URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id');

    // Fetch product details from API based on product ID
    fetch(`${productsUrl}/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productDetails = document.getElementById('prodetails');
            
            // Populate product detail page with product data
            productDetails.innerHTML = `
            <div class="single-pro-image">
            <img src="${product.ProductImage}" width="100%" id="MainImg" alt=""> <!--add "ProductImage" here-->
            </div>
        </div>
        <div class="single-pro-detail">
            <h6>Home / ${product.Category}</h6>
            <h4 id="title">${product.Title}</h4>               
            <h2 id="price">$${product.Price}</h2>     
            
            <input type="number" value="1">
            <button class="normal">Add to Cart</button>
            <h4>Product Details</h4>
            <span id="description">${product.Description}</span> <!--add "Description" here-->
        </div>
            `;
        })
        .catch(error => console.error('Error fetching product details:', error));
});