/* serch */
const openBtn = document.getElementById('openSearch');
const closeBtn = document.getElementById('closeSearch');
const overlay = document.getElementById('searchOverlay');
const input = document.getElementById('searchInput');

openBtn.onclick = () => {
    overlay.classList.add('active');
    input.focus();
};

closeBtn.onclick = () => {
    overlay.classList.remove('active');
};

// Optional: Close overlay on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        overlay.classList.remove('active');
    }
});
/* # */

/* slider */
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");
let currentIndex = 0;
let timer;

// Create dots
slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
}

function nextSlide() {
    let idx = (currentIndex + 1) % slides.length;
    showSlide(idx);
}

function prevSlide() {
    let idx = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(idx);
}

function goToSlide(idx) {
    showSlide(idx);
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 4000);
}

prev.addEventListener("click", () => {
    prevSlide();
    resetTimer();
});
next.addEventListener("click", () => {
    nextSlide();
    resetTimer();
});

// Auto slide
timer = setInterval(nextSlide, 4000);

// Responsive: pause on hover
document.querySelector(".slider-container").addEventListener("mouseenter", () => clearInterval(timer));
document.querySelector(".slider-container").addEventListener("mouseleave", resetTimer);
/* slider # */