const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'

    const small = formControl.querySelector('small');
    small.textContent = message;
}

// Check email is valid
function isValidEmail(email) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

// Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }
    if (email.value === '') {
        showError(email, 'Email is required');
    } else if(isValidEmail(email.value)) {
        showError(email, 'Email is not valid');
    } else {
        showSuccess(email);
    }
    if (password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }
    if (password2.value === '') {
        showError(password2, 'Password is required');
    } else {
        showSuccess(password2);
    }
})