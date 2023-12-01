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

  if (hostel === "") {
    document.getElementById("hostelError").textContent =
      "Please choose your hostel";
    isValid = false;
  }

  if (!size) {
    document.getElementById("sizeError").textContent = "Please choose a size";
    isValid = false;
  }

  if (!agree) {
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
    console.log("name:" + name);
    console.log("email:" + email);
    console.log("phone:" + phone);
    console.log("bitsID:" + bitsID);
    console.log("hostel:" + hostel);
    console.log("size:" + size.value);
    sendFormData(formData);
    saveFormDataToLocalStorage(formData);
  }
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validationBitsID(id) {
  var idRegex = /^20\d{2}[A-Za-z0-9]{4}\d{4}[PGHpgh]$/;
  const singleBranches = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
  ];
  const dualBranches = ["b1", "b2", "b3", "b4", "b5"];
  const idCheck = ["ps", "ts"];
  if (idRegex.test(id)) {
    if (
      singleBranches.includes(id.slice(4, 6).toLowerCase()) ||
      dualBranches.includes(id.slice(4, 6).toLowerCase())
    ) {
      if (
        singleBranches.includes(id.slice(6, 8).toLowerCase()) ||
        dualBranches.includes(id.slice(6, 8).toLowerCase()) ||
        idCheck.includes(id.slice(6, 8).toLowerCase())
      ) {
        return 1;
      }
    }
  }
  return 0;
}
function validatePhone(phone) {
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
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

// carousel

const prev = document.getElementById("prev-btn");
const next = document.getElementById("next-btn");
const list = document.getElementById("item-list");
const itemWidth = 150;
const padding = 10;

var carouselItem;
var imgSrc;

prev.addEventListener("click", () => {
  list.scrollLeft -= itemWidth + padding;

  // making the carousel infinite

  // carouselItem = document.querySelector("#item-list");
  // imgSrc = carouselItem.lastElementChild.getAttribute("src");
  // carouselItem.insertBefore(document.createElement("img"), carouselItem.firstElementChild);
  // carouselItem.lastElementChild.remove();
  // carouselItem.firstElementChild.setAttribute("src", imgSrc);
  // carouselItem.firstElementChild.setAttribute("class", "item");
  // console.log(carouselItem);
});
next.addEventListener("click", () => {
  list.scrollLeft += itemWidth + padding;
});

window.onload = populateFormWithStoredData;
