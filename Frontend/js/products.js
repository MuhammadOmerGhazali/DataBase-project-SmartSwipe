//Get request for products
const productsUrl = 'http://localhost:5000/api/products/';
const productsBody = document.querySelector('.products-body');
let output = '';

const renderProducts = (products) => {
    products.forEach(product => {

        const encodedProductId = encodeURIComponent(product.ProductID); 
        output += `
            <tr data-id=${encodedProductId}>
                <td>${product.ProductID}</td>
                <td>${product.Title}</td>
                <td>${product.Category}</td>
                <td>${product.Price}</td>
                <td>${product.Stock}</td>
                <td>${product.Description}</td>
                <td>${product.DiscountedPrice}</td>
                <td>${product.ProductImage}</td>
                <td>
                <button id="update-product">Update</button>
                <button id="delete-product">Delete</button>
                </td>
            </tr>
        `;
    });
    productsBody.innerHTML = output;
}
fetch(productsUrl)
    .then(res => res.json())
    .then(data =>
        renderProducts(data)
    );


//Post request for products
const addProductForm = document.querySelector('#addProduct'); // Select the form element

addProductForm.addEventListener('submit', (e) => {

    e.preventDefault();
    // Select form inputs by their IDs
    const productID = document.querySelector('#productID').value;
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    const price = document.querySelector('#price').value;
    const stock = document.querySelector('#stock').value;
    const description = document.querySelector('#description').value;
    const discountedPrice = document.querySelector('#discountedPrice').value;
    const productImage = document.querySelector('#productImage').value;

    // Make the POST request with form data
    fetch(productsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ProductID: productID,
            Title: title,
            Category: category,
            Price: price,
            Stock: stock,
            Description: description,
            DiscountedPrice: discountedPrice,
            ProductImage: productImage
        })
    })
        .then(res => 
            {
                return res.json();
            }
        )
        .then(data => {
            alert(data.message);
            location.reload();

        })
        .catch(error => {
            alert(error)
            location.reload();
        });
});



//Deleting  and updating

productsBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete-product') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${productsUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => {

                return res.json();
            })
            .then(data => {
                alert(data.message);
                location.reload(); // Reload the page after deletion
            });
    }

    else if (e.target.id === 'update-product') {
        e.preventDefault();

        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${productsUrl}/${id}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                document.querySelector('#uproductID').value = data.ProductID;
                document.querySelector('#utitle').value = data.Title;
                document.querySelector('#ucategory').value = data.Category;
                document.querySelector('#uprice').value = data.Price;
                document.querySelector('#ustock').value = data.Stock;
                document.querySelector('#udescription').value = data.Description;
                document.querySelector('#udiscountedPrice').value = data.DiscountedPrice;
                document.querySelector('#uproductImage').value = data.ProductImage;
                toggleForm('updateProduct');
            })
            .catch(error => console.error('Error:', error));
    }
});


// Add event listener for the update form submission
const updateProductForm = document.querySelector('#updateProduct');

updateProductForm.addEventListener('submit', (e) => {
    // Select form inputs by their IDs
    e.preventDefault(); // Prevent default form submission behavior
    const updatedProductID = document.querySelector('#uproductID').value;
    const updatedTitle = document.querySelector('#utitle').value;
    const updatedCategory = document.querySelector('#ucategory').value;
    const updatedPrice = document.querySelector('#uprice').value;
    const updatedStock = document.querySelector('#ustock').value;
    const updatedDescription = document.querySelector('#udescription').value;
    const updatedDiscountedPrice = document.querySelector('#udiscountedPrice').value;
    const updatedProductImage = document.querySelector('#uproductImage').value;

    // Make the PATCH request with updated form data
    fetch(`${productsUrl}/${updatedProductID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ProductID: updatedProductID,
            Title: updatedTitle,
            Category: updatedCategory,
            Price: updatedPrice,
            Stock: updatedStock,
            Description: updatedDescription,
            DiscountedPrice: updatedDiscountedPrice,
            ProductImage: updatedProductImage
        })
    })
        .then(res => res.json())
        .then(data => {
            // Display the message to the user
            alert(data.message);
            toggleForm('updateProduct'); // Close the update form
            location.reload(); // Reload the page to reflect changes
        })
        .catch(error => {
            console.error('Error updating product:', error);
            alert(error.message);
            location.reload();
        });
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch categories and populate the dropdown
    function populateCategories(selectId) {
        const categorySelect = document.getElementById(selectId);

        fetch('http://localhost:5000/api/categories/')
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.text = category.Category;
                    option.value = category.Category;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    // Call the function to populate categories for both add and update forms
    populateCategories('category'); // For add form
    populateCategories('ucategory'); // For update form
});

