// Code by Drashti Patel, std id: 8876406

"use strict";

// This function returns the element with the given id
const $ = function (id) {
   return document.getElementById(id);
};

// Get the current date and time
const now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

// This function returns the current day in the format "Month Day, Year"
function getCurrentDay() {
   let options = { day: 'numeric', month: 'long', year: 'numeric' };
   return now.toLocaleDateString('en-US', options);
}

// This function returns the current time in the format "hh:mm AM/PM"
function getCurrentTime() {

   // Get the current time
   const now = new Date();
   let hours = now.getHours();
   let minutes = now.getMinutes();

   // Determine whether it is AM or PM
   let meridiem = hours >= 12 ? 'PM' : 'AM';

   // Convert hours to 12-hour format
   hours = hours % 12 || 12;

   // Create the time string in the format "hh:mm AM/PM"
   return `${padSingleDigit(hours)}:${padSingleDigit(minutes)} ${meridiem}`;  
}

// This function adds a leading zero to a single-digit number
function padSingleDigit(num) {
   if (num < 10) {
      return "0" + num;
   } else {
      return num;
   }
};

// displays the current date
const currentDay = $("currentDay");
currentDay.innerHTML = `${getCurrentDay()}`;

// displays the current time
const currentTime = $("currentTime");
currentTime.innerHTML = getCurrentTime();

// Get the elements for the form inputs
const _name = $('name');
const email = $('email');
const phone = $('phone');
const place = $('floatingSelect');
const dateInput = $('date');
const appointmentForm = $('appointmentForm');

// Focus on the name input when the page loads
_name.focus();

// This function returns true if all the form fields have a value, otherwise it returns false
function isFormValid() {
   let isFormValid = true;

   if (_name.value == '') {
      isFormValid = false;
   } else if (email.value == '') {
      isFormValid = false;
   } else if (phone.value == '') {
      isFormValid = false;
   } else if (place.value == '') {
      isFormValid = false;
   } else if (dateInput.value == '') {
      isFormValid = false;
   }

   return isFormValid;
}

// Get the appointment form and listen for form submission
appointmentForm.addEventListener("submit", (event) => {

   // Prevent the form from submitting and refreshing the page
   event.preventDefault();

   // Generate a unique ID for the appointment using the current timestamp
   let id = Date.now().toString();

   // Check if the form input values are valid
   const formIsValid = isFormValid();

   if (formIsValid) {
      // Create an object with the appointment details
      let appointment = {
         id: id,
         _name: _name.value,
         email: email.value,
         phone: phone.value,
         place: place.value,
         dateInput: dateInput.value,
      };

      // Show an alert message with the appointment ID and success message
      alert('Hurray.. Your Appointment Is Successfully Booked. One of our Service Provider will Reach Out To You Soon. Your appointment ID is ' + id + '.');

      // If the user wants to set a reminder for the appointment
      if (confirm("Would you like to set a reminder for your appointment?")) {

         let validTime = false;

         // Loop until a valid reminder time is entered
         while (!validTime) {
            // Ask the user to enter a reminder time in hh:mm AM/PM format
            let reminderTime = prompt("Enter reminder time (hh:mm AM/PM):");

            // Split the reminder time string into hours, minutes, and meridiem (AM/PM)
            let [hours, minutes, meridiem] = reminderTime.split(/:|\s/);

            // If the user entered a valid time
            if (hours && minutes && meridiem) {
               // Parse the hours and minutes as integers
               hours = parseInt(hours);
               minutes = parseInt(minutes);

               // Convert hours to 24-hour format if meridiem is PM
               if (meridiem.toLowerCase() === 'pm') {
                  hours += 12;
               }

               // Create a Date object for the appointment date
               let reminderDate = new Date(dateInput.value);

               // Set the reminder time on the appointment date
               reminderDate.setHours(hours, minutes, 0, 0);

               // Get the current time
               let now = new Date();

               // If the reminder time is in the past, show an error message
               if (reminderDate.getTime() < now.getTime()) {
                  alert("Reminder time cannot be in the past.");
               } else {
                  // The reminder time is valid, so set a timeout to show the reminder message
                  validTime = true;
                  let timeDifference = reminderDate.getTime() - now.getTime();
                  console.log(timeDifference)
                  setTimeout(() => {
                     alert(`Reminder: Your appointment with ID ${id} is scheduled for ${dateInput.value} at ${place.value}.`);
                  }, timeDifference);
               }
            } else {
               // Show an error message if the time format is invalid
               alert("Invalid time format. Please enter time in hh:mm AM/PM format.");
            }
         }
      }

   } else {
      // Show an error message if any of the form fields are empty
      alert('All the form fields are required');
   }
});
