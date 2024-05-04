const categoriesUrl = "http://localhost:5000/api/categories"
const categoriesBody = document.querySelector(".categories-body")
let element =''; 

const renderdata=(categories)=>{
categories.forEach(category => {
    const encodedCategory = encodeURIComponent(category.Category);
    element += `
    <tr data-id=${encodedCategory}>
    <td>
    ${category.Category}
    </td>
    <td>
    <button id="delete-button">Delete</button>
    </td>
    </tr>
    `;
});
categoriesBody.innerHTML = element;

}

fetch(categoriesUrl)
    .then((res) => res.json())
    .then((data) => {
    renderdata(data)
    })



//Post request for categories
const addCategoryForm = document.querySelector('#addCategory');

addCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const category = document.querySelector('#category').value;

    fetch(categoriesUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Category: category
        })
    })
    .then(res => {
        // Check if response is okay
        if (!res.ok) {
            return res.json().then(errorData => {
                throw new Error(errorData.message);
            });
        }
        // Return the promise for parsing JSON
        return res.json();
    })
    .then(data => {
        // Display the message to the user
        alert(data.message);
        location.reload();
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error);
        location.reload();
        // Handle errors if necessary
    });
});






//Deleting

categoriesBody.addEventListener('click', (e) => {
    if (e.target.id === 'delete-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${categoriesUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                
                location.reload(); // Reload the page after deletion
            });
    }

});