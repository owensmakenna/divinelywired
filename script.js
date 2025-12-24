const gallery = document.getElementById('gallery');
const artFolder = 'art/';

// Add all your image filenames in the 'art/' folder
const images = [
  'art1.JPG','art2.jpg','art3.jpg','art4.jpg',
  'art5.jpg','art6.jpg','art7.jpg','art8.jpg',
  'art9.jpg','art10.jpg','art11.jpg','art12.jpg',
  'art13.jpg','art14.jpg','art15.jpg','art16.jpg'
];

// Shuffle images for random order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(images);

// Dynamically generate rows based on total images
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

// Scroll reveal animation
const frames = document.querySelectorAll('.frame');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

frames.forEach(frame => observer.observe(frame));

// Typing effect for subtitle
const subtitle = document.getElementById('subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let index = 0;

function type() {
  if(index < text.length) {
    subtitle.textContent += text.charAt(index);
    index++;
    setTimeout(type, 120);
  }
}

window.addEventListener('load', () => {
  type();
});
