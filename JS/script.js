/******************************************
Treehouse FSJS Techdegree: Peace Murerwa
Project 3 - Interactive form
******************************************/

//console.log('test');

document.addEventListener('DOMContentLoaded', () => {
    //2. Name field auto-focus on page load
    const nameInput = document.getElementById('name');
    nameInput.focus();

    //3. Hide the "Other job role" input field by default and show it only when "Other" is selected:
    const otherJobRole = document.getElementById('other-job-role');
    const jobRoleSelect = document.getElementById('title');
    otherJobRole.style.display = 'none';  // Hide "Other" job role by default

    jobRoleSelect.addEventListener('change', (event) => {
        if (event.target.value === 'other') {
            otherJobRole.style.display = 'block';
        } else {
            otherJobRole.style.display = 'none';
        }
    });

    //4. Disable the "Color" dropdown until a design is selected and show only relevant colors:
    const colorSelect = document.getElementById('color');
    const designSelect = document.getElementById('design');
    colorSelect.disabled = true;  // Disable color select initially

    designSelect.addEventListener('change', (event) => {
        const selectedDesign = event.target.value;
        colorSelect.disabled = false;
        
        // Filter colors based on selected design
        for (let option of colorSelect.options) {
            const theme = option.getAttribute('data-theme');
            if (theme === selectedDesign) {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
        // Set default color based on design selection
        colorSelect.value = colorSelect.querySelector('[data-theme="' + selectedDesign + '"]').value;
    });

    //5. Update the total cost of selected activities:
    const checkboxes = document.querySelectorAll('#activities input[type="checkbox"]');
    const activitiesFieldset = document.getElementById('activities');
    const activitiesCostDisplay = document.getElementById('activities-cost');
    let totalCost = 0;

    activitiesFieldset.addEventListener('change', (event) => {
        const activityCost = parseInt(event.target.getAttribute('data-cost'));
        if (event.target.checked) {
            totalCost += activityCost;
        } else {
            totalCost -= activityCost;
        }
        activitiesCostDisplay.textContent = `Total: $${totalCost}`;
        //Exceeds expectations #1
        // Conflict management: Disable conflicting activities
        const clickedTime = event.target.getAttribute('data-day-and-time');
        checkboxes.forEach((checkbox) => {
            const activityTime = checkbox.getAttribute('data-day-and-time');
            // If the checkbox has the same time as the clicked activity and it's not the clicked one
            if (activityTime === clickedTime && checkbox !== event.target) {
                if (event.target.checked) {
                    checkbox.disabled = true;
                    checkbox.parentElement.classList.add('disabled');
                } else {
                    checkbox.disabled = false;
                    checkbox.parentElement.classList.remove('disabled');
                }
            }
        });
    });

    //6. Set "Credit Card" as the default payment method and display only the relevant payment section:const paymentSelect = document.getElementById('payment');
    const paymentSelect = document.getElementById('payment');
    const creditCardSection = document.getElementById('credit-card');
    const paypalSection = document.getElementById('paypal');
    const bitcoinSection = document.getElementById('bitcoin');

    // Pre-select "Credit Card" and hide the other sections
    paymentSelect.value = 'credit-card';
    creditCardSection.style.display = 'block';  // Show credit card section by default
    paypalSection.style.display = 'none';       // Hide PayPal section
    bitcoinSection.style.display = 'none';      // Hide Bitcoin section

    // Listen for changes in the payment method selection
    paymentSelect.addEventListener('change', (event) => {
        const selectedPayment = event.target.value;

        // Show or hide payment sections based on the selected option
        creditCardSection.style.display = selectedPayment === 'credit-card' ? 'block' : 'none';
        paypalSection.style.display = selectedPayment === 'paypal' ? 'block' : 'none';
        bitcoinSection.style.display = selectedPayment === 'bitcoin' ? 'block' : 'none';
    });


    //7. Custom form validation including error checks from #9:
    
    nameInput.addEventListener('keyup', () => {
        isValidName();  // Real-Time Validation for Name Field
    });

    const emailInput = document.getElementById('email');
    emailInput.addEventListener('keyup', () => {
        isValidEmail();  // Real-Time Validation for Email Field
    });

    // Form Validation for Submit Event
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        let valid = true;

        if (!isValidName()) {
            valid = false;
            // Show error for name
        }
        if (!isValidEmail()) {
            valid = false;
            // Show error for email
        }
        if (!isActivitySelected()) {
            valid = false;
            // Show error for activities
        }

        if (paymentSelect.value === 'credit-card') {
            if (!isValidCardNumber() || !isValidZip() || !isValidCVV()) {
                valid = false;
                // Show error for credit card details
            }
        }
        if (!valid) {
            event.preventDefault();
        }
    });
    
    // Validation Helper Functions with error messages
    function isValidName() {
        if (nameInput.value.trim() === '') {
            showValidationError(nameInput, 'Name cannot be blank.');
            return false;
        } else {
            showValidationSuccess(nameInput);
            return true;
        }
    }

    function isValidEmail() {
        const emailHint = document.getElementById('email-hint');
        const emailRegex = /^[^@]+@[^@]+\.[a-z]+$/i;
        if (emailInput.value.trim() === '') {
            emailHint.textContent = 'Please enter an email address.';
            showValidationError(emailInput);
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailHint.textContent = 'Email address must be formatted correctly (e.g., brian@teamtreehouse.com).';
            showValidationError(emailInput);
            return false;
        } else {
            showValidationSuccess(emailInput);
            return true;
        }
    }
    function isActivitySelected() {
        const fieldset = document.getElementById('activities');
        let isSelected = false;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                isSelected = true;
            }
        });

        if (!isSelected) {
            showValidationError(fieldset, 'Please select at least one activity.');
            return false;
        } else {
            showValidationSuccess(fieldset);
            return true;
        }
    }

    function isValidCardNumber() {
        const ccInput = document.getElementById('cc-num');
        const ccRegex = /^\d{13,16}$/;
        if (!ccRegex.test(ccInput.value)) {
            showValidationError(ccInput, 'Credit card number must be between 13 - 16 digits.');
            return false;
        } else {
            showValidationSuccess(ccInput);
            return true;
        }
    }

    function isValidZip() {
        const zipInput = document.getElementById('zip');
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(zipInput.value)) {
            showValidationError(zipInput, 'Zip code must be 5 digits.');
            return false;
        } else {
            showValidationSuccess(zipInput);
            return true;
        }
    }
    function isValidCVV() {
        const cvvInput = document.getElementById('cvv');
        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(cvvInput.value)) {
            showValidationError(cvvInput, 'CVV must be 3 digits.');
            return false;
        } else {
            showValidationSuccess(cvvInput);
            return true;
        }
    }
    


    //8. Add focus and blur events for activities checkboxes:
    for (let checkbox of checkboxes) {
        checkbox.addEventListener('focus', (event) => {
            event.target.parentNode.classList.add('focus');
        });

        checkbox.addEventListener('blur', (event) => {
            event.target.parentNode.classList.remove('focus');
        });
    }
    

    //9.a Show Error for Invalid Fields:

    function showValidationError(element) {
        const parent = element.parentElement;
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        parent.querySelector('.hint').style.display = 'block';
    }
    //9.b Show Success for Valid Fields:

    function showValidationSuccess(element) {
        const parent = element.parentElement;
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
        parent.querySelector('.hint').style.display = 'none';
    }
});