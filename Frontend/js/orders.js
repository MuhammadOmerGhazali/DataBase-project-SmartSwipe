const ordersUrl = 'http://localhost:5000/api/orders/';
const ordersBody = document.querySelector('.orders-body');
let output = '';

const renderData = (orders) => {
    orders.forEach(orders => {

        const encodedOrderId = encodeURIComponent(orders.OrderID);
        output += `
            <tr data-id=${encodedOrderId}>
                <td>${orders.OrderID}</td>
                <td>${orders.CustomerID}</td>
                <td>${orders.Date}</td>
                <td>${orders.TotalCost}</td>
                <td>${orders.Address}</td>
                <td>${orders.OrderStatus}</td>
                <td>
                <button id="update-button">Update</button>
                
                </td>
            </tr>
        `;
    });
    ordersBody.innerHTML = output;
}
fetch(ordersUrl)
    .then(res => res.json())
    .then(data =>
        renderData(data)
    );




    //Deleting  and updating

ordersBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${ordersUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                location.reload(); // Reload the page after deletion
            });
    }

    else if (e.target.id === 'update-button') {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${ordersUrl}/orderid/${id}`)
            .then(res => res.json())
            .then(data => {
                // Populate form fields with fetched data
                document.querySelector('#orderId').value = data[0].OrderID
                document.querySelector('#customerId').value = data[0].CustomerID
                document.querySelector('#date').value = data[0].Date
                document.querySelector('#totalCost').value = data[0].TotalCost
                document.querySelector('#address').value = data[0].Address
                document.querySelector('#orderStatus').value = data[0].OrderStatus
                toggleForm('updateOrder');
            })
            .catch(error => console.log(error));
    }
});


const updateReviewForm = document.querySelector('#updateOrder'); // Updated selector

updateReviewForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Select form inputs by their IDs
    const orderId = document.querySelector('#orderId').value
    const customerId = document.querySelector('#customerId').value
    const date = document.querySelector('#date').value
    const totalCost = document.querySelector('#totalCost').value
    const address = document.querySelector('#address').value
    const orderStatus = document.querySelector('#orderStatus').value



    // Make the PATCH request with updated form data
    fetch(`${ordersUrl}/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            OrderID: orderId,
            CustomerID: customerId,
            Date: date,
            TotalCost: totalCost,
            Address: address,
            OrderStatus: orderStatus
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
        console.error('Error updating order:', error);
        alert(error);
        location.reload(); 
    });
});
