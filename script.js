document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");
  const passwordFeedback = document.getElementById("passwordFeedback");
  const passwordConditions = document.getElementById("passwordConditions");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    togglePasswordVisibility(password, togglePassword);
  });

  toggleConfirmPassword.addEventListener("click", function () {
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
  });

  function togglePasswordVisibility(input, icon) {
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  }

  // Validation for all fields
  firstName.addEventListener("input", validateFirstName);
  lastName.addEventListener("input", validateLastName);
  email.addEventListener("input", validateEmail);
  phone.addEventListener("input", validatePhone);
  password.addEventListener("input", validatePassword);
  confirmPassword.addEventListener("input", validateConfirmPassword);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      alert("Form submitted successfully!");
      // form.submit(); // This is to actually submit the form
    }
  });

  function validateFirstName() {
    const value = firstName.value.trim();
    const errorElement = document.getElementById("firstNameError");

    if (value === "") {
      showError(firstName, errorElement, "First name is required");
      return false;
    } else if (value.length < 2) {
      showError(
        firstName,
        errorElement,
        "First name must be at least 2 characters"
      );
      return false;
    } else {
      showSuccess(firstName, errorElement);
      return true;
    }
  }

  function validateLastName() {
    const value = lastName.value.trim();
    const errorElement = document.getElementById("lastNameError");

    if (value === "") {
      showError(lastName, errorElement, "Last name is required");
      return false;
    } else if (value.length < 2) {
      showError(
        lastName,
        errorElement,
        "Last name must be at least 2 characters"
      );
      return false;
    } else {
      showSuccess(lastName, errorElement);
      return true;
    }
  }

  function validateEmail() {
    const value = email.value.trim();
    const errorElement = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      showError(email, errorElement, "Email is required");
      return false;
    } else if (!emailRegex.test(value)) {
      showError(email, errorElement, "Please enter a valid email address");
      return false;
    } else {
      showSuccess(email, errorElement);
      return true;
    }
  }

  function validatePhone() {
    const value = phone.value.trim();
    const errorElement = document.getElementById("phoneError");
    const phoneRegex = /^\+?\d{10,15}$/;

    if (value === "") {
      showError(phone, errorElement, "Phone number is required");
      return false;
    } else if (!phoneRegex.test(value)) {
      showError(phone, errorElement, "Please enter a valid phone number");
      return false;
    } else {
      showSuccess(phone, errorElement);
      return true;
    }
  }

  function validatePassword() {
    const value = password.value;
    const errorElement = document.getElementById("passwordError");

    if (value === "") {
      passwordFeedback.style.display = "none";
      showError(password, errorElement, "Password is required");
      return false;
    } else {
      passwordFeedback.style.display = "block";
      const strength = checkPasswordStrength(value);
      updatePasswordStrength(strength);
      updatePasswordConditions(value);

      if (strength.score < 3) {
        showError(password, errorElement, "Password is too weak");
        return false;
      } else {
        showSuccess(password, errorElement);
        return true;
      }
    }
  }

  function validateConfirmPassword() {
    const value = confirmPassword.value;
    const passwordValue = password.value;
    const errorElement = document.getElementById("confirmPasswordError");

    if (value === "") {
      showError(confirmPassword, errorElement, "Please confirm your password");
      return false;
    } else if (value !== passwordValue) {
      showError(confirmPassword, errorElement, "Passwords do not match");
      return false;
    } else {
      showSuccess(confirmPassword, errorElement);
      return true;
    }
  }

  function showError(input, errorElement, message) {
    input.classList.add("error");
    input.classList.remove("success");
    errorElement.textContent = message;
  }

  function showSuccess(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("success");
    errorElement.textContent = "";
  }

  function checkPasswordStrength(password) {
    let score = 0;
    let message = "";

    // Check conditions
    const hasMinLength = password.length >= 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    // Calculate score
    if (hasMinLength) score++;
    if (hasLowerCase) score++;
    if (hasUpperCase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Determine strength level
    let strengthLevel;

    if (score <= 2) {
      strengthLevel = "weak";
      message = "Weak password";
    } else if (score <= 3) {
      strengthLevel = "medium";
      message = "Medium password";
    } else if (score <= 4) {
      strengthLevel = "strong";
      message = "Strong password";
    } else {
      strengthLevel = "very-strong";
      message = "Very strong password";
    }

    return {
      score,
      strengthLevel,
      message,
      hasMinLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecial,
    };
  }

  function updatePasswordStrength(strength) {
    strengthBar.className = "strength-bar";

    strengthBar.classList.add(`strength-${strength.strengthLevel}`);
    strengthText.textContent = strength.message;

    // Update text color based on strength
    switch (strength.strengthLevel) {
      case "weak":
        strengthText.style.color = "var(--error-color)";
        break;
      case "medium":
        strengthText.style.color = "var(--warning-color)";
        break;
      case "strong":
      case "very-strong":
        strengthText.style.color = "var(--success-color)";
        break;
    }
  }

  function updatePasswordConditions(password) {
    const conditions = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    // Update each conditions
    passwordConditions.querySelectorAll('li').forEach(li => {
        const condition = li.getAttribute('data-condition');
        if (conditions[condition]) {
            li.classList.add('valid');
        } else {
            li.classList.remove('valid');
        }
    });

    
  }
  
});
