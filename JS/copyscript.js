document.getElementById("name").focus();


const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

// Hide "Other job role" field initially
otherJobRole.style.display = 'none';

// Show/hide based on selection
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});


const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOptions = color.children;

// Disable color dropdown initially
color.disabled = true;

design.addEventListener('change', (e) => {
    const selectedDesign = e.target.value;

    // Enable color dropdown and filter based on design
    color.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const option = colorOptions[i];
        if (option.getAttribute('data-theme') === selectedDesign) {
            option.hidden = false;
        } else {
            option.hidden = true;
        }
    }
    color.selectedIndex = 0; // Reset the color selection
});


const activities = document.getElementById('activities');
const totalCostDisplay = document.getElementById('activities-cost');
let totalCost = 0;

activities.addEventListener('change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost'));

    if (e.target.checked) {
        totalCost += activityCost;
    } else {
        totalCost -= activityCost;
    }

    totalCostDisplay.textContent = `Total: $${totalCost}`;
});

const paymentMethod = document.getElementById('payment');
const creditCardSection = document.getElementById('credit-card');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');

// Hide non-credit card payment sections
paypalSection.style.display = 'none';
bitcoinSection.style.display = 'none';

// Set credit card as default
paymentMethod.value = 'credit-card';

paymentMethod.addEventListener('change', (e) => {
    const selectedPayment = e.target.value;

    if (selectedPayment === 'credit-card') {
        creditCardSection.style.display = 'block';
        paypalSection.style.display = 'none';
        bitcoinSection.style.display = 'none';
    } else if (selectedPayment === 'paypal') {
        creditCardSection.style.display = 'none';
        paypalSection.style.display = 'block';
        bitcoinSection.style.display = 'none';
    } else if (selectedPayment === 'bitcoin') {
        creditCardSection.style.display = 'none';
        paypalSection.style.display = 'none';
        bitcoinSection.style.display = 'block';
    }
});


nameField.addEventListener('blur', () => {
    isValidName();  // Real-Time Validation for Name Field
});

emailField.addEventListener('blur', () => {
    isValidEmail();  // Real-Time Validation for Email Field
});

// Form Validation for Submit Event
form.addEventListener('submit', (event) => {
    let valid = true;

    if (!isValidName()) valid = false; // Show error for name
    if (!isValidEmail()) valid = false; // Show error for email
    if (!isActivitySelected()) valid = false; // Show error for activities
    if (paymentSelect.value === 'credit-card' && (!isValidCardNumber() || !isValidZip() || !isValidCVV())) valid = false; // Show error for credit card details
        
    if (!valid) event.preventDefault();
});


const form = document.querySelector('form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const activitiesHint = document.getElementById('activities-hint');

function validateName() {
    const nameValue = nameField.value.trim();
    if (nameValue === '') {
        showError(nameField, 'Name cannot be blank');
        return false;
    } else {
        showValid(nameField);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailField.value;
    const emailPattern = /^[^@]+@[^@.]+\.[a-z]+$/i;
    if (!emailPattern.test(emailValue)) {
        showError(emailField, 'Email address must be formatted correctly');
        return false;
    } else {
        showValid(emailField);
        return true;
    }
}

function validateActivities() {
    const checkedActivities = document.querySelectorAll('#activities input:checked').length;
    if (checkedActivities === 0) {
        showError(activities, 'Choose at least one activity');
        return false;
    } else {
        showValid(activities);
        return true;
    }
}

function validatePayment() {
    if (paymentMethod.value === 'credit-card') {
        return validateCreditCard();
    }
    return true;
}

function validateCreditCard() {
    const ccNumValue = ccNum.value.trim();
    const zipValue = zip.value.trim();
    const cvvValue = cvv.value.trim();
    const ccNumPattern = /^\d{13,16}$/;
    const zipPattern = /^\d{5}$/;
    const cvvPattern = /^\d{3}$/;

    let valid = true;

    if (!ccNumPattern.test(ccNumValue)) {
        showError(ccNum, 'Card number must be between 13 - 16 digits');
        valid = false;
    } else {
        showValid(ccNum);
    }

    if (!zipPattern.test(zipValue)) {
        showError(zip, 'Zip Code must be 5 digits');
        valid = false;
    } else {
        showValid(zip);
    }

    if (!cvvPattern.test(cvvValue)) {
        showError(cvv, 'CVV must be 3 digits');
        valid = false;
    } else {
        showValid(cvv);
    }

    return valid;
}

function showError(element, message) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    const hint = element.parentElement.querySelector('.hint');
    hint.style.display = 'block';
    hint.textContent = message;
}

function showValid(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    const hint = element.parentElement.querySelector('.hint');
    hint.style.display = 'none';
}

form.addEventListener('submit', (e) => {
    if (!validateName() || !validateEmail() || !validateActivities() || !validatePayment()) {
        e.preventDefault();
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