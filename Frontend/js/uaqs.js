//Get request for uaqs
const uaqsUrl = 'http://localhost:5000/api/uaqs/';
const uaqsBody = document.querySelector('.uaqs-body');
let output = '';

const renderuaqs = (uaqs) => {
    uaqs.forEach(uaq => {

        const encodeduaqId = encodeURIComponent(uaq.UAQID); 
        output += `
            <tr data-id=${encodeduaqId}>
                <td>${uaq.UAQID}</td>
                <td>${uaq.ProductID}</td>
                <td>${uaq.CustomerID}</td>
                <td>${uaq.Question}</td>
                <td>${uaq.Answer}</td>
                <td>
                <button id="update-button">Update</button>
                <button id="delete-button">Delete</button>
                </td>
            </tr>
        `;
    });
    uaqsBody.innerHTML = output;
}
fetch(uaqsUrl)
    .then(res => res.json())
    .then(data =>
        renderuaqs(data)
    );


//Post request for uaqs
const adduaqForm = document.querySelector('#addUaq'); // Select the form element

adduaqForm.addEventListener('submit', (e) => {

    e.preventDefault();
    // Select form inputs by their IDs
    const uaqID = document.querySelector('#uaqId').value;
    const ProductID = document.querySelector('#productId').value;
    const Customer = document.querySelector('#customerId').value;
    const Question = document.querySelector('#question').value;
    const Answer = document.querySelector('#answer').value;

    

    // Make the POST request with form data
    fetch(uaqsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UAQID:uaqID,
            CustomerID:Customer,
            ProductID:ProductID,
            Question:Question,
            Answer:Answer
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

uaqsBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${uaqsUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => {

                return res.json();
            })
            .then(data => {
                alert(data.message);
                location.reload(); // Reload the page after deletion
            })
            .catch(error => {
                alert(error);
                location.reload();
            });
    }

    else if (e.target.id === 'update-button') {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${uaqsUrl}/single/${id}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                toggleForm('updateUaq');
                document.querySelector('#uuaqId').value = data[0].UAQID;
                document.querySelector('#uproductId').value = data[0].ProductID;
                document.querySelector('#ucustomerId').value = data[0].CustomerID;
                document.querySelector('#uquestion').value = data[0].Question;
                document.querySelector('#uanswer').value = data[0].Answer;
            })
            .catch(error => console.log(error));
    }
});


// Add event listener for the update form submission
const updateuaqForm = document.querySelector('#updateUaq');

updateuaqForm.addEventListener('submit', (e) => {
    // Select form inputs by their IDs
    e.preventDefault(); // Prevent default form submission behavior
    const uaqID = document.querySelector('#uuaqId').value;
    const ProductID = document.querySelector('#uproductId').value;
    const Question = document.querySelector('#uquestion').value;
    const Answer = document.querySelector('#uanswer').value;
    
    
    // Make the PATCH request with updated form data
    fetch(`${uaqsUrl}/${uaqID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FAQID:uaqID,
            ProductID:ProductID,
            Question:Question,
            Answer:Answer
        })
    })
        .then(res => res.json())
        .then(data => {
            // Display the message to the user
            alert(data.message);
            toggleForm('updateUaq'); // Close the update form
            location.reload(); // Reload the page to reflect changes
        })
        .catch(error => {
            console.error('Error updating uaq:', error);
            alert(error.message);
            location.reload();
        });
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch cproducts and populate the dropdown
    function populateProducts(selectId) {
        const productSelect = document.getElementById(selectId);

        fetch('http://localhost:5000/api/products/')
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const option = document.createElement('option');
                    option.text = product.ProductID;
                    option.value = product.ProductID;
                    productSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Call the function to populate categories for both add and update forms
    populateProducts('productId'); // For add form
    populateProducts('uproductId'); // For update form
});

