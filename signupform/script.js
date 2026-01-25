const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

confirmPassword.addEventListener('input', () => {
    if(confirmPassword.value === password.value) {
        confirmPassword.style.borderColor = "green";
        confirmPassword.setCustomValidity("");
    } else {
        confirmPassword.style.borderColor = "red";
        confirmPassword.setCustomValidity("Passwords must match");
    }
});