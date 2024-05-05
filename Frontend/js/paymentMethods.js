const paymentMethodsUrl = "http://localhost:5000/api/paymentmethods"
const paymentMethodsBody = document.querySelector(".paymentMethods-body")
let element =''; 

const renderdata=(paymentMethods)=>{
paymentMethods.forEach(method => {
    const encodedMethodId = encodeURIComponent(method.MethodID);
    element += `
    <tr data-id=${encodedMethodId}>
    <td>
    ${method.MethodID}
    </td>
    <td>
    ${method.PaymentMethodName}
    </td>
    <td>
    ${method.Type}
    </td>
    <td>
    <button id="delete-button">Delete</button>
    </td>
    </tr>
    `;
});
paymentMethodsBody.innerHTML = element;

}

fetch(paymentMethodsUrl)
    .then((res) => res.json())
    .then((data) => {
    renderdata(data)
    })



//Post request for paymentMethods
const addMethodForm = document.querySelector('#addPaymentMethod');

addMethodForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const MethodId = document.querySelector('#methodId').value;
    const PaymentMethodName = document.querySelector('#paymentMethod').value;
    const Type = document.querySelector('#type').value;

    fetch(paymentMethodsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           MethodID: MethodId,
           PaymentMethodName: PaymentMethodName,
           Type: Type
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

paymentMethodsBody.addEventListener('click', (e) => {
    if (e.target.id === 'delete-button') {
        let id = e.target.parentElement.parentElement.dataset.id;
        fetch(`${paymentMethodsUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                
                location.reload(); // Reload the page after deletion
            });
    }

});