function Validation(values){
    let error= {}
    const mail_pattern = /^[^\s@+@[^\s@]+\.[^\s@]+$/
    const mdp_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.mail === ""){
        error.mail = "Veuillez mettre votre email"
    }

    if(values.mdp === ""){
        error.mdp = "Veuillez mettre votre mot de passe"
    } 
    return error;
}

export default Validation;