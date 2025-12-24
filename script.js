const gallery = document.getElementById('gallery');
const artFolder = 'art/';

// List all 36 images
let images = [
  'art1.jpg','art2.jpg','art3.jpg','art4.jpg','art5.jpg','art6.jpg','art7.jpg','art8.jpg',
  'art9.jpg','art10.jpg','art11.jpg','art12.jpg','art13.jpg','art14.jpg','art15.jpg','art16.jpg',
  'art17.jpg','art18.jpg','art19.jpg','art20.jpg','art21.jpg','art22.jpg','art23.jpg','art24.jpg',
  'art25.jpg','art26.jpg','art27.jpg','art28.jpg','art29.jpg','art30.jpg','art31.jpg','art32.jpg',
  'art33.jpg','art34.jpg','art35.jpg','art36.jpg'
];

// 1️⃣ Normalize all filenames to lowercase to prevent case issues
images = images.map(img => img.toLowerCase());

// 2️⃣ Shuffle images
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(images);

// 3️⃣ Dynamically generate rows
let currentIndex = 0;
const maxImagesPerRow = 4;
const minImagesPerRow = 2;

while (currentIndex < images.length) {
  const row = document.createElement('div');
  row.className = 'row';

  const rowSize = Math.min(
    Math.floor(Math.random() * (maxImagesPerRow - minImagesPerRow + 1)) + minImagesPerRow,
    images.length - currentIndex
  );

  for (let j = 0; j < rowSize; j++, currentIndex++) {
    const img = images[currentIndex];

    const frame = document.createElement('div');
    frame.className = 'frame';
    frame.style.setProperty('--width', (Math.floor(Math.random() * 100) + 380) + 'px');
    frame.style.setProperty('--flexBasis', (100 / rowSize) + '%');

    frame.innerHTML = `<img src="${artFolder}${img}" alt="Artwork">`;

    row.appendChild(frame);
  }

  gallery.appendChild(row);
}

// 4️⃣ Scroll reveal animation
const frames = document.querySelectorAll('.frame');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

frames.forEach(frame => observer.observe(frame));

// 5️⃣ Typing effect for subtitle
const subtitle = document.getElementById('subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let index = 0;

function type() {
  if(index < text.length) {
    subtitle.textContent += text.charAt(index);
    index++;
    setTimeout(type, 120);
  } else {
    // Remove cursor line after typing finishes
    subtitle.style.borderRight = 'none';
  }
}

window.addEventListener('load', () => {
  type();
});
