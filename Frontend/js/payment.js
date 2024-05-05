const paymentsUrl = 'http://localhost:5000/api/payments/';
const paymentsBody = document.querySelector('.payments-body');
let output = '';

const renderData = (payments) => {
    payments.forEach(payment => {

        const encodedOrderId = encodeURIComponent(payment.OrderID);
        output += `
            <tr data-id=${encodedOrderId}>
                <td>${payment.OrderID}</td>
                <td>${payment.PaymentMethod}</td>
                <td>${payment.PaymentStatus}</td>
                <td>
                <button id="update-button">Update</button>
                
                </td>
            </tr>
        `;
    });
    paymentsBody.innerHTML = output;
}
fetch(paymentsUrl)
    .then(res => res.json())
    .then(data =>
        renderData(data)
    );




    //Deleting  and updating

paymentsBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'update-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${paymentsUrl}/${id}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                document.querySelector('#orderId').value = data[0].OrderID
                document.querySelector('#paymentMethod').value = data[0].PaymentMethod
                document.querySelector('#paymentStatus').value = data[0].PaymentStatus
                toggleForm('updatePayment');
            })
            .catch(error => console.log(error));
    }
});


const updatePaymentForm = document.querySelector('#updatePayment'); // Updated selector

updatePaymentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Select form inputs by their IDs
    const orderId = document.querySelector('#orderId').value
    const paymentMethod = document.querySelector('#paymentMethod').value
    const paymentStatus = document.querySelector('#paymentStatus').value


    console.log(paymentStatus)
    // Make the PATCH request with updated form data
    fetch(`${paymentsUrl}/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            OrderID: orderId,
            PaymentMethod: paymentMethod,
            PaymentStatus:paymentStatus
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        // Display the message to the user
        alert(data.message);
        toggleForm('updateReview'); // Close the update form
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error updating Payment Method:', error);
        alert(error);
        location.reload(); 
    });
});
