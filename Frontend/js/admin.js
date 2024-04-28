

//Toggling dispaly of forms
function toggleForm(id) {
    var form = document.getElementById(id);
    if (form.style.display == 'none') {
        form.style.display = 'block';
    }
    else {
        form.style.display = 'none';
    }
}

//Get request for products
const productsUrl = 'http://localhost:5000/api/products/';
const productsBody = document.querySelector('.products-body');
let output = '';




const renderProducts = (products) => {
    products.forEach(product => {
        output += `
            <tr data-id=${product.ProductID}>
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


    //
    

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
        .then(res => res.json())
        .then(data => {
            // Display the message to the user
            alert(data.message);
            output = ''
            fetch(productsUrl)
                .then(res => res.json())
                .then(data => renderProducts(data))
                .catch(error => console.error('Error:', error));
            toggleForm('addProduct');

        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if necessary
        });
});



//Deleting  and updating

productsBody.addEventListener('click', (e) => {
    if (e.target.id === 'delete-product') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${productsUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => { 
            alert(data.message);
            location.reload(); // Reload the page after deletion
        });
    }

    if (e.target.id === 'update-product') {
        
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
        })
        .catch(error => console.error('Error:', error));
        toggleForm('updateProduct');
    }
});


// Add event listener for the update form submission
const updateProductForm = document.querySelector('#updateProduct');
updateProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Select form inputs by their IDs
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
        console.error('Error:', error);
        // Handle errors if necessary
    });
});




