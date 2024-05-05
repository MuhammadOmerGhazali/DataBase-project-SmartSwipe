//Get request for faqs
const faqsUrl = 'http://localhost:5000/api/faqs/';
const faqsBody = document.querySelector('.faqs-body');
let output = '';

const renderfaqs = (faqs) => {
    faqs.forEach(faq => {

        const encodedfaqId = encodeURIComponent(faq.FAQID); 
        output += `
            <tr data-id=${encodedfaqId}>
                <td>${faq.FAQID}</td>
                <td>${faq.ProductID}</td>
                <td>${faq.Question}</td>
                <td>${faq.Answer}</td>
                <td>
                <button id="update-button">Update</button>
                <button id="delete-button">Delete</button>
                </td>
            </tr>
        `;
    });
    faqsBody.innerHTML = output;
}
fetch(faqsUrl)
    .then(res => res.json())
    .then(data =>
        renderfaqs(data)
    );


//Post request for faqs
const addfaqForm = document.querySelector('#addFaq'); // Select the form element

addfaqForm.addEventListener('submit', (e) => {

    e.preventDefault();
    // Select form inputs by their IDs
    const faqID = document.querySelector('#faqId').value;
    const ProductID = document.querySelector('#productId').value;
    const Question = document.querySelector('#question').value;
    const Answer = document.querySelector('#answer').value;

    

    // Make the POST request with form data
    fetch(faqsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FAQID:faqID,
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

faqsBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${faqsUrl}/${id}`, {
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
        fetch(`${faqsUrl}/single/${id}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                document.querySelector('#ufaqId').value = data[0].FAQID;
                document.querySelector('#uproductId').value = data[0].ProductID;
                document.querySelector('#uquestion').value = data[0].Question;
                document.querySelector('#uanswer').value = data[0].Answer;
                toggleForm('updateFaq');
            })
            .catch(error => console.log(error));
    }
});


// Add event listener for the update form submission
const updatefaqForm = document.querySelector('#updateFaq');

updatefaqForm.addEventListener('submit', (e) => {
    // Select form inputs by their IDs
    e.preventDefault(); // Prevent default form submission behavior
    const faqID = document.querySelector('#ufaqId').value;
    const ProductID = document.querySelector('#uproductId').value;
    const Question = document.querySelector('#uquestion').value;
    const Answer = document.querySelector('#uanswer').value;
    
    // Make the PATCH request with updated form data
    fetch(`${faqsUrl}/${faqID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FAQID:faqID,
            ProductID:ProductID,
            Question:Question,
            Answer:Answer
        })
    })
        .then(res => res.json())
        .then(data => {
            // Display the message to the user
            alert(data.message);
            toggleForm('updateFaq'); // Close the update form
            location.reload(); // Reload the page to reflect changes
        })
        .catch(error => {
            console.error('Error updating faq:', error);
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

