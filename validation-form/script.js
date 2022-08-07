const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.textContent = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Get field name
function getFieldName(input) {
    let name = input.id === 'password2' ? 'password' : input.id;
    return name[0].toUpperCase() + name.substring(1);
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(item => {
        const name = getFieldName(item);

        if (item.value.trim() === '') {
            showError(item, `${name} is required`);
        } else {
            showSuccess(item);
        } 
    })
}

// Check input length
function checkLength(input, min, max) {
    const inputName = getFieldName(input);

    if (input.value.length === 0) {
        showError(input, `${inputName} is required`);
    } else if (input.value.length < min) {
        showError(input, `${inputName} must be at least ${min} chatacters`);
    } else if (input.value.length > max) {
        showError(input, `${inputName} must be less than ${max} chatacters`);
    }  else {
        showSuccess(input);
    }
}

// Check email is valid
function checkEmail(input) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (re.test(input.value)) {
        showSuccess(input);
    } else if (input.value.length === 0) {
        showError(input, 'Email is required');
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input2.value.length === 0) {
        showError(input2, 'Confirm your password');
    } else if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input2);
    }
}

// Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})