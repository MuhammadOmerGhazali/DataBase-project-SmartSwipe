//Endpoints
const productsUrl ='http://localhost:5000/api/products'

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


//Getting all products
fetch(productsUrl)
    .then(res =>res.json())
    .then(data => console.log(data));

