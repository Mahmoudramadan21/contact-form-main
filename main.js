document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-us__form");
  const submitButton = form.querySelector(".contact-us__submit");
  const successMsg = document.querySelector(".contact-us__success-msg");
  const queryOptions = document.querySelectorAll(".contact-us__query-option");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = {
      fName: form.querySelector("#fName"),
      lName: form.querySelector("#lName"),
      email: form.querySelector("#email"),
      qType: form.querySelector('input[name="qType"]:checked'),
      msg: form.querySelector("#msg"),
      consent: form.querySelector("#consent"),
    };

    const isValid = validateForm(formData);

    if (isValid) {
      showSuccessMessage();
      // form.submit(); // Uncomment to enable form submission
    }
  });

  queryOptions.forEach((option) => {
    option.addEventListener("click", () => {
      highlightSelectedOption(option);
      selectRadioButton(option);
    });
  });

  function validateForm(formData) {
    let isValid = true;

    if (!formData.fName.value.trim()) {
      showError(formData.fName, "This field is required");
      isValid = false;
    } else {
      clearError(formData.fName);
    }

    if (!formData.lName.value.trim()) {
      showError(formData.lName, "This field is required");
      isValid = false;
    } else {
      clearError(formData.lName);
    }

    if (!formData.email.value.trim() || !validateEmail(formData.email.value)) {
      showError(formData.email, "Please enter a valid email address");
      isValid = false;
    } else {
      clearError(formData.email);
    }

    if (!formData.qType) {
      showError(
        form.querySelector(".contact-us__query-options"),
        "Please select a query type"
      );
      isValid = false;
    } else {
      clearError(form.querySelector(".contact-us__query-options"));
    }

    if (!formData.msg.value.trim()) {
      showError(formData.msg, "This field is required");
      isValid = false;
    } else {
      clearError(formData.msg);
    }

    if (!formData.consent.checked) {
      showError(
        formData.consent,
        "To submit this form, please consent to being contacted"
      );
      isValid = false;
    } else {
      clearError(formData.consent);
    }

    return isValid;
  }

  function showError(element, message) {
    const parent =
      element.closest(".contact-us__field") ||
      element.closest(".contact-us__query-options");
    const errorElement = parent.querySelector(".contact-us__error-msg");
    errorElement.textContent = message;
    errorElement.classList.add(`${element.name}-error-msg`);
    element.setAttribute("aria-invalid", "true"); // Improve accessibility
  }

  function clearError(element) {
    const parent =
      element.closest(".contact-us__field") ||
      element.closest(".contact-us__query-options");
    const errorElement = parent.querySelector(".contact-us__error-msg");
    errorElement.textContent = "";
    errorElement.classList.remove(`${element.name}-error-msg`);
    element.setAttribute("aria-invalid", "false"); // Improve accessibility
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function highlightSelectedOption(option) {
    queryOptions.forEach((opt) => (opt.style.backgroundColor = ""));
    option.style.backgroundColor = "hsl(148, 38%, 91%)";
  }

  function selectRadioButton(option) {
    const radioButton = option.querySelector("input[type='radio']");
    if (radioButton) {
      radioButton.checked = true;
    }
  }

  function showSuccessMessage() {
    successMsg.classList.add("fade-in");
    setTimeout(() => {
      successMsg.classList.remove("fade-in");
    }, 1500);
  }
});
