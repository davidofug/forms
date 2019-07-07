document.getElementById('loginForm').addEventListener('submit', EVENT => {
    EVENT.preventDefault()
    const USERNAME = EVENT.target.loginusername.value
    const PASSWORD = EVENT.target.loginpassword.value
    const REMEMBER = EVENT.target.remember
    const ERROR_ELEMENT = document.getElementById('loginErrorMsgs')

    if (USERNAME.length <= 0 || PASSWORD.length <= 0)
    {
        ERROR_ELEMENT.innerHTML += `<p class="error">Username/password required!</p>`
        return
    }

    ERROR_ELEMENT.innerHTML = ''

/*     if(REMEMBER.checked) {
        //Set this website in localStorage or in cookies
    } */

    axios.post('https://domain.tld/api', {
        username: USERNAME,
        password: PASSWORD,
    })
    .then(response => {
        const {RESULT} = response.data

        if (RESULT == 'success') {
            setTimeout(() => window.location = RESULT.redirect, 10);
        } else {
            ERROR_ELEMENT.innerHTML = `<p class="error">Something went wrong. Try again!</p>`
        }
    })
    .catch(error => {
        ERROR_ELEMENT.innerHTML = `<p class="error">Something went wrong. Try again!</p>`
        console.log(error)
    })
})