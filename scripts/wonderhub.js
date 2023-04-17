// Code by Karan Dhiman, std id: 8877564

"use strict";

// Define the initial slide index and call the showSlides function
let slideIndex = 0;
showSlides();

// Function to move to the next slide and reset the timer
function nextSlide() {
  slideIndex++;
  showSlides();
  resetTimer();
}

// Function to move to the previous slide and reset the timer
function prevSlide() {
  slideIndex--;
  showSlides();
  resetTimer();
}

// Function to move to a specific slide and reset the timer
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  resetTimer();
}

// Function to display the current slide and update the active dot
function showSlides() {
  // Get all the slides and dots
  const slides = document.querySelectorAll(".slides");
  const dots = document.querySelectorAll(".dots");

  // Handle wraparound of slideIndex
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Show the current slide
  slides[slideIndex].style.display = "block";

  // Update the active dot
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[slideIndex].classList.add("active");
}

// Set the timer and start autoplay
let timer = 10; // seconds
let intervalId = setInterval(nextSlide, timer * 1000);

// Function to reset the timer
function resetTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, timer * 1000);
}

// Use jQuery to make the #drop-menu element into an accordion menu
$(function() {
  $('#drop-menu').accordion({
    heightStyle: 'content',
    collapsible: true
  });
});

