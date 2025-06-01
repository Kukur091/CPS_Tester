function Validation(values){
    let error= {}
    const mail_pattern = /^[^\s@+@[^\s@]+\.[^\s@]+$/
    const mdp_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === ""){
        error.name = "Veuillez mettre votre pseudo"
    }
    if(values.mail === ""){
        error.mail = "Veuillez mettre votre email"
    }

    if(values.mdp === ""){
        error.mdp = "Veuillez mettre votre mot de passe"
    }
    if(values.confirmmdp === ""){
        error.confirmmdp = "Veuillez confirmez votre mot de passe"
    }

    if(values.confirmmdp !== values.mdp){
        error.confirmmdp = "Les mots de passe ne correspondent pas, veuillez mettre votre mot de passe identique"
    }
    return error;
}

export default Validation;