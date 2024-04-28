// Function to get current date and time in the required format
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + now.getDate()).slice(-2); // Add leading zero if needed
    const hours = ('0' + now.getHours()).slice(-2); // Add leading zero if needed
    const minutes = ('0' + now.getMinutes()).slice(-2); // Add leading zero if needed
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDateTime;
}

// Set the value of the datetime-local input to the current date and time
document.getElementById('dateAdded').value = getCurrentDateTime();
