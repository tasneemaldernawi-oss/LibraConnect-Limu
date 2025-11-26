let captchaAnswer = null;
document.addEventListener("DOMContentLoaded", ()=>{
    

    fetch("../components/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);
          // Load footer
        fetch('../components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                document.getElementById('footer').innerHTML = '<p>Error loading footer</p>';
            });
});
// Generate a simple math captcha, e.g. "3 + 7 = ?"
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 9) + 1; // 1–9
    const num2 = Math.floor(Math.random() * 9) + 1; // 1–9

    captchaAnswer = num1 + num2;

    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captchaInput');
    const captchaError = document.getElementById('captchaError');

    captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
    captchaInput.value = '';
    captchaError.textContent = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Generate the first captcha when the page loads
    generateCaptcha();

    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('captchaError').textContent = '';
        document.getElementById('successMessage').style.display = 'none';

        let isValid = true;

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const captchaInputValue = document.getElementById('captchaInput').value.trim();

        // Validate name
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            isValid = false;
        }

        // Validate email
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else if (!email.includes('@limu.edu.ly')) {
            document.getElementById('emailError').textContent = 'Email must contain @limu.edu.ly';
            isValid = false;
        }

        // Validate password
        if (password === '') {
            document.getElementById('passwordError').textContent = 'Password is required.';
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
            isValid = false;
        }

        // Validate captcha (compare with numeric answer)
        if (captchaInputValue === '') {
            document.getElementById('captchaError').textContent = 'Please answer the verification question.';
            isValid = false;
        } else if (parseInt(captchaInputValue, 10) !== captchaAnswer) {
            document.getElementById('captchaError').textContent = 'Incorrect answer. Please try again.';
            isValid = false;
            // Optionally generate a new captcha after a wrong attempt
            generateCaptcha();
        }

        // If all validations pass
        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';

            // Reset form and generate a new captcha
            this.reset();
            generateCaptcha();
        }
    });
});
