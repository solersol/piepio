// Select the foreground element
const foreground = document.querySelector('.foreground-main-scene');

// Store the initial bottom value
let initialBottom = parseFloat(getComputedStyle(foreground).bottom);

// Listen for scroll events
window.addEventListener('scroll', function() {
    // Calculate the new bottom value based on the scroll amount
    let scrollOffset = window.scrollY * 0.1; // Adjust the multiplier as needed
    let newBottom = initialBottom + scrollOffset;

    // Apply a maximum offset of 30px
    newBottom = Math.min(newBottom, initialBottom + 50);

    // Apply the new bottom value to the foreground element
    foreground.style.bottom = `${newBottom}px`;
});


// ---------------
// Function to animate numbers inside spans with the class 'animate-number'
function animateNumbers() {
  const numbers = document.querySelectorAll('.animate-number');
  const options = {
      threshold: 0,
      rootMargin: "0px 0px -50px 0px"
  };
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              const finalNumber = parseFloat(target.textContent.replace(/,/g, ''));
              let startNumber = 0;
              if (finalNumber === 0) {
                  startNumber = 100;
              }
              const decimalPlaces = (finalNumber % 1 === 0) ? 0 : finalNumber.toString().split('.')[1].length || 0;
              const duration = Math.max(Math.min(finalNumber * 10, 5000), 2000); // Limit duration between 800ms and 3000ms
              const step = (timestamp, startTime) => {
                  if (!startTime) startTime = timestamp;
                  const progress = timestamp - startTime;
                  const percentage = Math.min(progress / duration, 1);
                  const number = startNumber + (finalNumber - startNumber) * percentage;
                  target.textContent = number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  if (percentage < 1) {
                      requestAnimationFrame(timestamp => step(timestamp, startTime));
                  }
              };
              requestAnimationFrame(step);
              observer.unobserve(target);
          }
      });
  }, options);
  numbers.forEach(number => {
      observer.observe(number);
  });
}

// Call the function to start observing the numbers
animateNumbers();


// -----------------------
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero-section');
  const spriteContainer = document.createElement('div');
  spriteContainer.classList.add('sprite-container');
  heroSection.prepend(spriteContainer);

  function createSprite() {
      const sprite = document.createElement('div');
      sprite.classList.add('sprite');
      sprite.style.left = Math.random() * 80 + 10 + '%'; // Random left position within the hero section
      sprite.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random animation duration between 2 and 5 seconds
      spriteContainer.appendChild(sprite); // Append the sprite to the sprite container
      setTimeout(() => {
          sprite.style.opacity = '0'; // Fade out the sprite
          setTimeout(() => {
              sprite.remove(); // Remove the sprite from the DOM
          }, 700); // Remove after 700ms
      }, sprite.style.animationDuration.replace('s', '') * 1000 * 0.7); // Remove after falling 70% of the way
  }

  const observer = new IntersectionObserver((entries) => {
      const isInViewport = entries[0].isIntersecting;
      if (isInViewport) {
          setInterval(createSprite, 1600); // Create a new sprite every second
      } else {
          clearInterval(); // Stop creating sprites when not in viewport
      }
  });

  observer.observe(heroSection);
});

document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.roadmap-section');
  const spriteContainer = document.createElement('div');
  spriteContainer.classList.add('sprite-container');
  heroSection.prepend(spriteContainer);

  function createSprite() {
    const sprite = document.createElement('div');
    sprite.classList.add('coin-sprite');
    const randomLeft = Math.random() * 40 + 60; // Random left position within the right 40% of the hero section
    const maxLeft = window.innerWidth * 0.4 - sprite.offsetWidth; // Maximum left position within the viewport
    sprite.style.left = Math.min(randomLeft, maxLeft) + '%';
    sprite.style.animationDuration = '1s'; // Random animation duration between 2 and 5 seconds
    spriteContainer.appendChild(sprite); // Append the sprite to the sprite container
    setTimeout(() => {
        sprite.style.opacity = '0'; // Fade out the sprite
        setTimeout(() => {
            sprite.remove(); // Remove the sprite from the DOM
        }, 700); // Remove after 700ms
    }); // Remove after falling 70% of the way
}


  const observer = new IntersectionObserver((entries) => {
      const isInViewport = entries[0].isIntersecting;
      if (isInViewport) {
          setInterval(createSprite, 600); // Create a new sprite every second
      } else {
          clearInterval(); // Stop creating sprites when not in viewport
      }
  });

  observer.observe(heroSection);
});