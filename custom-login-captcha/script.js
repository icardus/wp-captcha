document.addEventListener('DOMContentLoaded', function () {
    // Function to generate a random CAPTCHA string
    function generateCaptcha() {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var captcha = '';
        for (var i = 0; i < 5; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }

    // Function to add CAPTCHA to the login form
    function addCaptchaToLoginForm() {
        var captcha = generateCaptcha();
        var captchaContainer = '<p class="login-captcha">';
        captchaContainer += '<label for="custom_login_captcha">CAPTCHA:</label>';
        captchaContainer += '<input type="text" name="custom_login_captcha" id="custom_login_captcha" class="input" value="" size="20" />';
        captchaContainer += '<span class="description">Enter the following code:&nbsp;</span>';
        captchaContainer += '<span class="captcha-image">' + captcha + '</span>';
        captchaContainer += '</p>';

        // Append CAPTCHA field to the login form
        var loginForm = document.getElementById('loginform');
        if (loginForm) {
            loginForm.insertAdjacentHTML('beforeend', captchaContainer);

            // Store the correct CAPTCHA value in a hidden field for verification
            var hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'custom_login_captcha_hidden';
            hiddenInput.name = 'custom_login_captcha_hidden';
            hiddenInput.value = captcha;
            loginForm.appendChild(hiddenInput);
        }
    }

    // Function to verify CAPTCHA on form submission
    function verifyCaptcha() {
        var enteredCaptcha = document.getElementById('custom_login_captcha').value;
        var correctCaptcha = document.getElementById('custom_login_captcha_hidden').value;

        // Check if the entered CAPTCHA is correct
        if (enteredCaptcha !== correctCaptcha) {
            alert('CAPTCHA Verification failed. Try it again.');
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    }

    // Add CAPTCHA to the login form when the DOM is fully loaded
    addCaptchaToLoginForm();

    // Attach the CAPTCHA verification function to the form submission
    var loginForm = document.getElementById('loginform');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            if (!verifyCaptcha()) {
                event.preventDefault(); // Prevent form submission
            }
        });
    }
});
