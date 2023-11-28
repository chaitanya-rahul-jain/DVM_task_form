// saving data locally
function saveFormDataToLocalStorage(formData) {
  localStorage.setItem("formData", JSON.stringify(formData));
}

function getFormDataFromLocalStorage() {
  var storedFormData = localStorage.getItem("formData");
  return storedFormData ? JSON.parse(storedFormData) : null;
}

function populateFormWithStoredData() {
  var storedFormData = getFormDataFromLocalStorage();
  if (storedFormData) {
    document.getElementById("name").value = storedFormData.name;
    document.getElementById("email").value = storedFormData.email;
    document.getElementById("phone").value = storedFormData.phone;
    document.getElementById("bitsID").value = storedFormData.bitsID;
    document.getElementById("hostel").value = storedFormData.hostel;
    document.querySelector(
      'input[name="size"][value="' + storedFormData.size + '"]'
    ).checked = true;
    document.getElementById("agree").checked = storedFormData.agree;
  }
}

// success modal

function showSuccessModal() {
  var successModal = document.getElementById("successModal");
  successModal.style.display = "block";
}

function closeSuccessModal() {
  var successModal = document.getElementById("successModal");
  successModal.style.display = "none";
}

// validate form

function validateForm() {
  // Reset error messages
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("idError").textContent = "";
  document.getElementById("hostelError").textContent = "";
  document.getElementById("sizeError").textContent = "";
  document.getElementById("agreeError").textContent = "";

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var bitsID = document.getElementById("bitsID").value;
  var hostel = document.getElementById("hostel").value;
  var size = document.querySelector('input[name="size"]:checked');
  var agree = document.getElementById("agree").checked;

  var isValid = true;


  

  // Validate name
  if (name === "" || name.length < 5 || name.length > 50) {
    document.getElementById("nameError").textContent =
      "Name must be between 5 and 50 characters";
    isValid = false;
  }

  // Validate email
  if (!validateEmail(email)) {
    document.getElementById("emailError").textContent =
      "Enter a valid email address";
    isValid = false;
  }

  // Validate BITS ID
  if (!validationBitsID(bitsID)) {
    document.getElementById("idError").textContent = "Enter a valid BITS ID";
    isValid = false;
  }

  // Valid Number
  if (!validatePhone(phone)) {
    document.getElementById("phoneError").textContent =
      "Enter a valid phone number";
    isValid = false;
  }

  if (hostel === '') {
    document.getElementById("hostelError").textContent =
      "Please choose your hostel";
    isValid = false;
  }

  if (!size){
    document.getElementById("sizeError").textContent =
      "Please choose a size";
    isValid = false;
  }

  if (!agree){
    document.getElementById("agreeError").textContent = 
      "Please agree to the terms and conditions to continue";
    isValid = false;
  }

  if (isValid) {
    var formData = {
      name: name,
      email: email,
      phone: phone,
      bitsID: bitsID,
      hostel: hostel,
      size: size.value,
      agree: agree,
    };
    logData();
    sendFormData(formData);
    saveFormDataToLocalStorage(formData);
  }
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validationBitsID(id) {
  var idRegex = /^20\d{2}[A-Za-z0-9]{2}PS\d{4}[PGH]$/;
  return idRegex.test(id);
}
function validatePhone(phone) {
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function logData(){
  console.log("name:" + name);
  console.log("email:" + email);
  console.log("phone:" + phone);
  console.log("bitsID:" + bitsID);
  console.log("hostel:" + hostel);
  console.log("size:" + size);
}

function sendFormData(formData) {
  fetch("https://www.foo.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  showSuccessModal();
}

window.onload = populateFormWithStoredData;
