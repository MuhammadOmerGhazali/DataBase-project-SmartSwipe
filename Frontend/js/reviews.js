const reviewsUrl = 'http://localhost:5000/api/reviews/';
const reviewsBody = document.querySelector('.reviews-body');
let output = '';

const renderData = (reviews) => {
    reviews.forEach(reviews => {

        const encodedProductId = encodeURIComponent(reviews.ProductID);
        const encodedCustomerId = encodeURIComponent(reviews.CustomerID);
        output += `
            <tr data-id1=${encodedProductId} data-id2=${encodedCustomerId}>
                <td>${reviews.ProductID}</td>
                <td>${reviews.CustomerID}</td>
                <td>${reviews.Message}</td>
                <td>${reviews.Rating}</td>
                <td>
                <button id="update-button">Update</button>
                <button id="delete-button">Delete</button>
                </td>
            </tr>
        `;
    });
    reviewsBody.innerHTML = output;
}
fetch(reviewsUrl)
    .then(res => res.json())
    .then(data =>
        renderData(data)
    );




    //Deleting  and updating

reviewsBody.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(e.target)
    if (e.target.id === 'delete-button') {
        let id1 = e.target.parentElement.parentElement.dataset.id1;
        let id2 = e.target.parentElement.parentElement.dataset.id2;
        fetch(`${reviewsUrl}/${id1}/${id2}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                location.reload(); // Reload the page after deletion
            });
    }

    else if (e.target.id === 'update-button') {

        let id1 = e.target.parentElement.parentElement.dataset.id1;
        let id2 = e.target.parentElement.parentElement.dataset.id2;
        fetch(`${reviewsUrl}/${id1}/${id2}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                document.querySelector('#uproductID').value = data[0].ProductID;
                document.querySelector('#ucustomerID').value = data[0].CustomerID;
                document.querySelector('#ureview').value = data[0].Message;
                document.querySelector('#urating').value = data[0].Rating;
                
                toggleForm('updateReview');
            })
            .catch(error => alert(error.message));
    }
});


const updateReviewForm = document.querySelector('#updateReview'); // Updated selector

updateReviewForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Select form inputs by their IDs
    const updatedProductID = document.querySelector('#uproductID').value;
    const updatedCustomerID = document.querySelector('#ucustomerID').value; // Updated selector
    const updatedMessage = document.querySelector('#ureview').value; // Updated selector
    const updatedRating = document.querySelector('#urating').value; // Updated selector

    // Make the PATCH request with updated form data
    fetch(`${reviewsUrl}/${updatedProductID}/${updatedCustomerID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ProductID: updatedProductID,
            CustomerID: updatedCustomerID,
            Message: updatedMessage,
            Rating: updatedRating
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update review');
        }
        return res.json();
    })
    .then(data => {
        // Display the message to the user
        alert(data.message);
        toggleForm('updateReview'); // Close the update form
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error updating review:', error);
        alert('Error updating review');
    });
});
