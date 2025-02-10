import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Parallax Video Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
  const videoSrc = card.getAttribute('data-video');
  const videoContainer = document.querySelector('.video-container');
  const videoElement = document.querySelector('.fullscreen-video');

  card.addEventListener('mouseenter', () => {
    videoElement.setAttribute('src', `./public/assets/videos/${videoSrc}`);
    videoContainer.classList.add('active');
    videoElement.play();
    gsap.to(card, { scale: 0.95, duration: 0.3 });
  });

  card.addEventListener('mouseleave', () => {
    videoContainer.classList.remove('active');
    videoElement.pause();
    gsap.to(card, { scale: 1, duration: 0.3 });
  });
});

// Horizontal Scroll for Desktop
if (window.innerWidth > 768) {
  gsap.to(".portfolio-grid", {
    xPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: ".portfolio-grid",
      scrub: 1,
      pin: true,
      end: "+=2000"
    }
  });
}
