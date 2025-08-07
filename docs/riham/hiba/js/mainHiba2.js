const validateForm = (event) => {
    event.preventDefault();
    
    // Récupération des valeurs des champs
    const nom = document.getElementById('nom-fieldd').value.trim();
    const prenom = document.getElementById('prenom-fieldd').value.trim();
    const adresse_email = document.getElementById('mail-fieldd').value.trim();
    const numero_telephone = document.getElementById('tel-fieldd').value.trim();
    const pays = document.getElementById('pays').value.trim();
    const ville = document.getElementById('ville').value.trim();
    const mot_de_passe = document.getElementById('pass_fieldd').value.trim();
    const conf_mot_de_passe = document.getElementById('conf-pass_fieldd').value.trim();
    // Validation des champs
    if (nom === '') {
        document.getElementById('name-error').innerText = "Le champ nom est requis.";
        return;
    }

    if (prenom === '') {
        document.getElementById('prenom-error').innerText = "Le champ prénom est requis.";
        return;
    }

    if (adresse_email === '') {
        document.getElementById('mail-error').innerText = "Le champ adresse email est requis.";
        return;
    } else if (!isValidEmail(adresse_email)) {
        document.getElementById('mail-error').innerText = "Veuillez entrer une adresse email valide.";
        return;
    }

    if (numero_telephone === '') {
        document.getElementById('tel-error').innerText = "Le champ numéro de téléphone est requis.";
        return;
    } else if (!isValidPhoneNumber(numero_telephone)) {
        document.getElementById('tel-error').innerText = "Veuillez entrer un numéro de téléphone valide.";
        return;
    }

    if (mot_de_passe === '') {
        document.getElementById('pass_error').innerText = "Le champ mot de passe est requis.";
        return;
    } else if (!isStrongPassword(mot_de_passe)) {
        document.getElementById('pass_error').innerText = "Entrez un password plus délicat";
        return;
    }
    if (conf_mot_de_passe === '') {
        document.getElementById('conf-pass_error').innerText = "Le champ confirmation du mot de passe est requis.";
        return;
    } else if (conf_mot_de_passe !== mot_de_passe) {
        document.getElementById('conf-pass_error').innerText = "Les mots de passe ne correspondent pas.";
        return;
    }

    
    // Si toutes les validations sont passées, préparer les données à envoyer
    const dataToSend = {
        nom: nom,
        prenom: prenom,
        adresse_email: adresse_email,
        numero_telephone: numero_telephone,
        pays: pays,
        ville: ville,
        mot_de_passe: mot_de_passe
    };

    // Envoi de la requête AJAX si la validation est réussie
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/clients", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
            window.location.href = "http://127.0.0.1:5502/riham/indexFacture.html";
        } else {
            alert(xhr.response);
        }
    });
    xhr.addEventListener("error", () => {
        alert("Erreur lors de la requête.");
    });
    xhr.send(JSON.stringify(dataToSend));
};

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction de validation de numéro de téléphone (doit contenir uniquement des chiffres)
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
}

// Fonction de validation de la force du mot de passe
function isStrongPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/><,.\[\]\\=-]).{8,}$/;
    return passwordRegex.test(password);
}


function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const fieldType = passwordField.getAttribute('type');
    passwordField.setAttribute('type', fieldType === 'password' ? 'text' : 'password');
}