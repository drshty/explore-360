let slideIndex = 0;
showSlides();

// Next-previous control
function nextSlide() {
  slideIndex++;
  showSlides();
  resetTimer();
}

function prevSlide() {
  slideIndex--;
  showSlides();
  resetTimer();
}

// Thumbnail image controlls
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  resetTimer();
}

function showSlides() {
  const slides = document.querySelectorAll(".slides");
  const dots = document.querySelectorAll(".dots");

  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  
  // hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // show current slide
  slides[slideIndex].style.display = "block";
  
  // update active dot
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[slideIndex].classList.add("active");
}

// autoplay slides
let timer = 10; // seconds
let intervalId = setInterval(nextSlide, timer * 1000);

function resetTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, timer * 1000);
}
