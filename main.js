document.addEventListener("DOMContentLoaded", () => {
  // Get the submit button
  let submit = document.querySelector("form .submit");

  // Add click event listener to the submit button
  submit.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get form elements
    let form = document.querySelector("form");
    let fName = form.fName;
    let lName = form.lName;
    let email = form.email;
    let qType = form.querySelector('input[name="qType"]:checked'); // Find the selected radio button
    let msg = form.msg;
    let consent = form.consent;

    // Get the error message element
    let errorMsg = document.querySelector(".error-msg");

    // Set a flag for form validation
    let valid = true;

    // Validate consent checkbox
    function validateConsent() {
      if (consent.checked) {
        consent.value = 'agree'; // Set value to 'agree' if checked
      } else {
        consent.value = ''; // Set value to empty if unchecked
      }
      return true;
    }

    validateConsent(); // Call the validateConsent function

    // Function to create an error message element
    function createErrorElem(elem, msg) {
      let parent = `.${elem.parentElement.className}`.split(" ")[0];
      let errorElem = document.querySelector(`${parent} .error-msg`);
      
      errorElem.classList.add(`${elem.name}-error-msg`);
      errorElem.textContent = msg;
    }

    // Function to remove an error message element
    function removeErrorElem(elem) {
      let parent = `.${elem.parentElement.className}`.split(" ")[0];
      let errorElem = document.querySelector(`${parent} .error-msg`);
      
      errorElem.classList.remove(`${elem.name}-error-msg`);
      errorElem.textContent = "";
    }

    // Validate first name
    if (fName.value.trim().length === 0) {
      createErrorElem(fName, "This field is required");
    } else {
      removeErrorElem(fName);
    }

    // Validate last name
    if (lName.value.trim().length === 0) {
      createErrorElem(lName, "This field is required");
      valid = false;
    } else {
      removeErrorElem(lName);
    }

    // Validate email
    if (email.value.trim().length === 0 || !validateEmail(email.value)) {
      createErrorElem(email, "Please enter a valid email address");
      valid = false;
    } else {
      removeErrorElem(email);
    }

    // Validate query type (radio buttons)
    if (!qType) {
      createErrorElem(form.querySelector('.query-options'), "Please select a query type");
      valid = false;
    } else {
      removeErrorElem(form.querySelector('.query-options'));
    }

    // Validate message textarea
    if (msg.value.trim().length === 0) {
      createErrorElem(msg, "This field is required");
      valid = false;
    } else {
      removeErrorElem(msg);
    }

    // Validate consent checkbox
    if (consent.value.length === 0) {
      createErrorElem(consent, "To submit this form, please consent to being contacted");
      valid = false;
    } else {
      removeErrorElem(consent);
    }

    // If all validations pass, show success message and submit the form
    if (valid) {
      e.preventDefault(); // Prevent default submission for demonstration
      let successMsg = document.querySelector(".success-msg");
      successMsg.classList.add("fade-in");
    
      // Remove the fade-in effect after 1 second
      setTimeout(() => {
        successMsg.classList.remove("fade-in");
      }, 1500);
    
      // Submit the form if all validations pass (uncomment to enable)
      // form.submit();
    }
    
  });

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Get all query options (radio buttons)
  let qOptions = document.querySelectorAll(".contact-us .query-option");

  // Add click event listener to each query option
  qOptions.forEach(qOption => {
    qOption.addEventListener("click", function() {
      // Reset the background color for all options
      qOptions.forEach(option => option.style.backgroundColor = "");
  
      // Set the background color for the clicked option
      this.style.backgroundColor = "hsl(148, 38%, 91%)";
      
      // Check the input inside the clicked option
      let input = this.querySelector("input[type='radio']");
      if (input) {
        input.checked = true;  // Set the radio button as checked
      }
      
    });
  });

});
