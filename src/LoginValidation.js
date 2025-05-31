function validation(values){
    alert("")
    let error= {}
    const email_pattern = /^[^\s@+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Veuillez mettre votre email"
    }
    
}