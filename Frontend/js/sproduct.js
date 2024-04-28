//Endpoints
const apiUrl = 'http://localhost:5000/api/products';

// function to fetch data about a single product uwu
async function fetchProduct(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        console.log(product)
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}


