function validateForm(event) {
    event.preventDefault(); 

    const emailField = document.getElementById("email-field").value;
    const passwordField = document.getElementById("password-field").value;
    if (!emailField || !passwordField) {
        alert("Veuillez entrer votre email et mot de passe.");
        return; 
    }
    const dataToSend = {
        email: emailField,
        password: passwordField
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
            window.location.href = "/riham/indexFacture.html";
        } else {
            alert("Identifiants incorrects. Veuillez réessayer.");
        }
    });
    xhr.send(JSON.stringify(dataToSend));
}
