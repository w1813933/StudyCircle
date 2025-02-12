//Retrieves form and input elements by their IDs.
const form = document.getElementById('signUp_form')
const name_input = document.getElementById('name_input')
const email_input = document.getElementById('email_input')
const password_input = document.getElementById('password_input')
const confirm_password_input = document.getElementById('confirm_password_input')
const error_message = document.getElementById('error-message')


/*Checks if name_input exists:
/If yes, it's a sign-up form, so it calls getSignupFormErrors().
If no, it's a login form, so it calls getLoginFormErrors()
*/
form.addEventListener('submit', (e) => {

    let errors = []

    if(name_input){

        errors = getSignupFormErrors(name_input.value, email_input.value, password_input.value, confirm_password_input.value )

    }
    else{

        errors = getLoginFormErrors(email_input.value, password_input.value)

    }
/*If there are errors, it prevents form submission and displays them.
Otherwise, it redirects to "dashboard.html".*/ 
    if(errors.length > 0){
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
    else{
        e.preventDefault();
        window.location.href = 'dashboard.html';
    }

})


/*Checks for empty fields (name, email, password).
Ensures password is at least 8 characters.
Confirms passwords match.*/
function getSignupFormErrors(name, email, password, confirm_password){
    let errors = []

    if(name === '' || name == null){
        errors.push('Name is Required')
        name_input.parentElement.classList.add('incorrect')
    }

    if(email === '' || email == null){
        errors.push('Email is Required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password == null){
        errors.push('Passoword is Required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password !== confirm_password){
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('incorrect')
        confirm_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}



/*Checks if email and password are filled.*/
function getLoginFormErrors(email, password){
    let errors = []

    if(email === '' || email == null){
        errors.push('Email is Required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password == null){
        errors.push('Passoword is Required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

/*Removes error styles (incorrect class) when the user starts typing.
Clears error message when input is corrected.*/ 

const allInputs = [name_input, email_input, password_input, confirm_password_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})