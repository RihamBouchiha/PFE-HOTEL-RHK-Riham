function validateForm(event) {
    event.preventDefault(); 

    const emailField = document.getElementById("email-field").value;
    const passwordField = document.getElementById("password-field").value;
    
    const dataToSend = {
        mail_agent: emailField,
        password_agent: passwordField
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/agent2", true); // endpoint modifié
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
            // Redirection vers une autre page après une connexion réussie
            window.location.href = "/riham/indexAgent.html";
        } else {
            alert("Identifiants incorrects. Veuillez réessayer.");
        }
    });
    
    xhr.send(JSON.stringify(dataToSend));
}
