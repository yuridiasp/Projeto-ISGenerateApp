function showErrorResult() {
    document.querySelector(".loader").classList.toggle('loader-fail')
};

function showSuccessResult() {
    document.querySelector(".loader").classList.toggle('loader-complete')
};

function showLoader() {
    const loginLoader = document.querySelector(".login-loader")
    loginLoader.classList.toggle('hidde')
    loginLoader.classList.toggle('visible')
};

async function login(event) {
    event.preventDefault()
    const form = document.querySelector("#login-form")
    const errorCode = document.querySelector("#error-code")
    const errorNumberCode = document.querySelector("#error-number-code")
    const errorMessage = document.querySelector("#error-message")
    const errors = []
    
    if (!form.login.value.length)
        errors.push("Login não informado")
    if (!form.senha.value.length)
        errors.push("Senha não informada")

    if(errors.length)
        return

    showLoader()

    const result = await window.API.loginKorbil({ login: form.login.value, senha: form.senha.value  })

    console.log(result)

    if(result.success) {
        showSuccessResult()
        window.API.sendCredencialsToRenderer({ login: form.login.value, senha: form.senha.value  })
        setTimeout(() => window.API.fecharJanelaLogin(), 2000)
    }
    else {
        showErrorResult()
        const { code, message, statusCode } = result.error
        errorCode.innerHTML = code
        errorNumberCode.innerHTML = statusCode
        errorMessage.innerHTML = message
    }
};

function main() {
    const retryLogin = document.querySelector("#retry-login")
    const form = document.querySelector("#login-form")
    
    form.addEventListener("submit", login)
    retryLogin.addEventListener("click", () => { showLoader(); showErrorResult() })

    /* setTimeout(() => {
        showLoader()
        setTimeout(() => showErrorResult(), 1000)
    }, 1000) */
}

main()