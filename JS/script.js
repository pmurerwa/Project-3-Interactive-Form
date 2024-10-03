/******************************************
Treehouse FSJS Techdegree: Peace Murerwa
Project 3 - Interactive form
******************************************/

//console.log('test');

    //2. Name field auto-focus on page load
document.getElementById('name').focus();

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
    
    for (let option of colorSelect.options) {
        const theme = option.getAttribute('data-theme');
        if (theme === selectedDesign) {
            option.hidden = false;
        } else {
            option.hidden = true;
        }
    }
    colorSelect.value = colorSelect.querySelector('[data-theme="' + selectedDesign + '"]').value;
});
    

    //5. Update the total cost of selected activities:
const checkboxes = document.querySelectorAll('#activities input[type="checkbox"]');
const fieldset = document.getElementById('activities');
const activitiesCostDisplay = document.getElementById('activities-cost');
let totalCost = 0;

fieldset.addEventListener('change', (event) => {
    const activityCost = parseInt(event.target.getAttribute('data-cost'));
    if (event.target.checked) {
        totalCost += activityCost;
    } else {
        totalCost -= activityCost;
    }
    activitiesCostDisplay.textContent = `Total: $${totalCost}`;

            // Disable conflicting activities
    const clickedTime = event.target.getAttribute('data-day-and-time');
        checkboxes.forEach((checkbox) => {
            const activityTime = checkbox.getAttribute('data-day-and-time');
            // If the checkbox has the same time as the clicked activity and it's not the clicked one
            if (activityTime === clickedTime && checkbox !== event.target) {
                if (event.target.checked) {
                    checkbox.disabled = event.target.checked;
                    checkbox.parentElement.classList.add('disabled');
                } else {
                    checkbox.disabled = false;
                    checkbox.parentElement.classList.toggle('disabled', event.target.checked);
                }
            }
        });
});
    
    //6. Set "Credit Card" as the default payment method and display only the relevant payment section:const paymentSelect = document.getElementById('payment');
const paymentSelect = document.getElementById('payment');
const creditCardSection = document.getElementById('credit-card');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');

    // Hide non-credit-card sections by default
paypalSection.style.display = 'none'; // Hide PayPal section
bitcoinSection.style.display = 'none'; // Hide Bitcoin section
paymentSelect.value = 'credit-card';  // Select credit card by default
   
    // Listen for changes in the payment method selection
paymentSelect.addEventListener('change', (event) => {
    const selectedPayment = event.target.value;

    // Show or hide payment sections based on the selected option
    creditCardSection.style.display = selectedPayment === 'credit-card' ? 'block' : 'none';
    paypalSection.style.display = selectedPayment === 'paypal' ? 'block' : 'none';
    bitcoinSection.style.display = selectedPayment === 'bitcoin' ? 'block' : 'none';
});

    //7. Custom form validation including error checks from #9:
    
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const emailRegex = /^[^@]+@[^@]+\.[a-z]+$/i;
const emailHint = document.getElementById('email-hint');
const ccInput = document.getElementById('cc-num');
const ccRegex = /^\d{13,16}$/;
const zipInput = document.getElementById('zip');
const zipRegex = /^\d{5}$/;
const cvvInput = document.getElementById('cvv');
const cvvRegex = /^\d{3}$/;


nameInput.addEventListener('blur', () => {
    isValidName();  // Real-Time Validation for Name Field
});
function isValidName() {
    if (nameInput.value.trim() === '') {
        showValidationError(nameInput, 'Name cannot be blank.');
        return false;
    } else {
        showValidationSuccess(nameInput);
        return true;
    }
}

emailInput.addEventListener('blur', () => {
    isValidEmail();  // Real-Time Validation for Email Field
});
function isValidEmail() {
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
    let isSelected = false;

    // Loop through checkboxes to check if any are selected
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            isSelected = true;
        }
    });
    
    if (!isSelected) {
        fieldset.classList.add('not-valid');
        fieldset.classList.remove('valid');
        fieldset.querySelector('.hint').style.display = 'block';
    } else {
        fieldset.classList.add('valid');
        fieldset.classList.remove('not-valid');
        fieldset.querySelector('.hint').style.display = 'none';
    }

    return isSelected;
}

function isValidCardNumber() {
    if (!ccRegex.test(ccInput.value)) {
        showValidationError(ccInput, 'Credit card number must be between 13 - 16 digits.');
        return false;
    } else {
        showValidationSuccess(ccInput);
        return true;
    }
}
function isValidZip() {
    if (!zipRegex.test(zipInput.value)) {
        showValidationError(zipInput, 'Zip code must be 5 digits.');
        return false;
    } else {
        showValidationSuccess(zipInput);
        return true;
    }
}
function isValidCVV() {
    if (!cvvRegex.test(cvvInput.value)) {
        showValidationError(cvvInput, 'CVV must be 3 digits.');
        return false;
    } else {
        showValidationSuccess(cvvInput);
        return true;
    }
}
    // Form Validation for Submit Event
    //Modify the form submission logic to check for validation and prevent submission if any of the fields are invalid.
form.addEventListener('submit', (event) => {
    let valid = true;

    // Check if all fields are valid and only validate credit card fields if "credit-card" is selected
    if (!isValidName()) valid = false; // Show error for name
    if (!isValidEmail()) valid = false; // Show error for email
    if (!isActivitySelected()) valid = false; // Show error for activities
    if (paymentSelect.value === 'credit-card' && (!isValidCardNumber() || !isValidZip() || !isValidCVV())) valid = false; // Show error for credit card details

    // Prevent form submission if any validation fails
    if (!valid) {
        event.preventDefault();
    }
});
    
    //8. Add focus and blur events for activities checkboxes:
for (let checkbox of checkboxes) {
    checkbox.addEventListener('focus', (event) => {
        event.target.parentNode.classList.add('focus');
    });

    checkbox.addEventListener('blur', (event) => {
        event.target.parentNode.classList.remove('focus');
    });
}

    //9.a. Show Error for Invalid Fields:

function showValidationError(element) {
    const parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.querySelector('.hint').style.display = 'block';
    element.style.borderColor = 'red';  // Add red outline
}
    //b. Show Success for Valid Fields:

function showValidationSuccess(element) {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.querySelector('.hint').style.display = 'none';
    element.style.borderColor = '';  // Remove red outline
}