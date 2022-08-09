window.addEventListener('DOMContentLoaded', () => {
    // Form Validation
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const inputs = form.querySelectorAll('input');

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
        });
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
        if (input2.value.length < 6) {
            showError(input2, 'Confirm your password');
        } else if (input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
        } else {
            showSuccess(input2);
        }
    }

    // Clear all inputs
    function clearInputs() {
        inputs.forEach(input => input.value = '');
    }
    
    // Check if inputs are valid
    function inputsAreValid(arr) {
        let res = true;
        arr.forEach(item => {
            if (item.classList.contains('error') || item.value.trim() === '') {
                res = false;
            }
        });
        return res;
    }
    
    // Event listener on Inputs change | inputs validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            checkRequired([input]);
            switch (input) {
                case username:
                    checkLength(username, 3, 15);
                    break;
                case email:
                    checkEmail(email);
                    break;
                case password:
                    checkLength(password, 6, 25);
                    // checkPasswordsMatch(password, password2);
                    break;
                case password2:
                    checkPasswordsMatch(password, password2);
                    break;
            }
        });
    });

    // Post User to JSON-file

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const message = {
        loading: "Loading...",
        success: "Your registration is successful",
        failure: "Something went wrong...",
        spinner: 'img/spinner.gif',
        ok: 'img/ok.png',
        fail: 'img/fail.png'
    };

    // Event listener on Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        checkRequired([username, email, password, password2]);
        
        if (inputsAreValid(inputs)) {
            let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                form.parentNode.append(statusMessage);

                form.classList.add('animate__animated', 'animate__fadeOutUp');
                setTimeout(() => {
                    form.style.display = 'none';   
                }, 400);
    
            let statusImg = document.createElement('img');
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animate__animated', 'animate__fadeInDown');
                statusMessage.append(statusImg);
    
            let textMessage = document.createElement('div');
                textMessage.classList.add('animate__animated', 'animate__fadeInDown');
                textMessage.textContent = message.loading;
                statusMessage.append(textMessage);
                
            const formData = new FormData(form);

            let obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            postData('http://localhost:3000/users', obj)
                .then(res => {
                    console.log(res);

                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;

                    clearInputs();
                })
                .catch(err => {
                    console.error(err);

                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('animate__fadeOutUp');
                        form.classList.add('animate__fadeInUp');
                    }, 2000);

                    inputs.forEach(input => {
                        input.parentElement.classList.remove('success');
                    });
                });
        }
    });
    
});

