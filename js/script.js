 const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})

function login(){
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let rname = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    if (email==rname && password==pass) {
        window.location.href = "trivia.html";
    } else {
        alert("Invalid username or password");
    }
}

function register(){
    let email = document.getElementById('emailreg').value;
    let pass = document.getElementById('passwordreg').value;
    let confirmPass = document.getElementById('confirmpwd').value;

    if (pass !== confirmPass) {
        // Show error message
        document.getElementById("errorMessage").innerText = "Passwords do not match";
        return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', pass);
    alert("Registration successful! Please Login");
    window.location.href = "index.html";
}