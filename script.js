import { animate, createTimeline, stagger, utils } from './lib/anime.esm.js';

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  createFloatingElements();
  setupCursorFollower();
  createWorldAnimation();
  setupScrollAnimations();
  setupInteractiveEffects();
  setupHeroButton();
  setupSectionAnimations();
  setupContactForm();
  setupMobileNavigation();
  setupActiveSectionHighlight();
  setupDarkMode();
});

function initializeAnimations() {
  // Hero text animation
  const heroText = document.querySelector('.hero-text');
  const highlight = document.querySelector('.highlight');
  
  // Initial state
  utils.set(heroText, { opacity: 0, translateY: 50 });
  utils.set(highlight, { scaleX: 0 });
  
  // Animate hero text in
  animate(heroText, {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1200,
    ease: 'outExpo',
    delay: 300
  });
  
  // Animate highlight underline
  animate(highlight, {
    scaleX: [0, 1],
    duration: 800,
    ease: 'outQuart',
    delay: 1000
  });
  
  // Header elements animation
  const headerElements = document.querySelectorAll('.header > *');
  animate(headerElements, {
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 600,
    ease: 'outQuad',
    delay: stagger(100)
  });
  
  // Newsletter section animation
  const newsletterElements = document.querySelectorAll('.newsletter > *');
  animate(newsletterElements, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    ease: 'outQuad',
    delay: stagger(150, { start: 500 })
  });
}

function createFloatingElements() {
  const container = document.getElementById('floating-elements');
  const elementCount = 15;
  
  // Create floating particles
  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Random size
    const sizes = ['', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    if (randomSize) element.classList.add(randomSize);
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    utils.set(element, {
      left: x + '%',
      top: y + '%',
      opacity: 0,
      scale: 0
    });
    
    container.appendChild(element);
  }
  
  const elements = container.querySelectorAll('.floating-element');
  
  // Animate floating elements
  animate(elements, {
    opacity: [0, 0.3],
    scale: [0, 1],
    duration: 1000,
    ease: 'outQuad',
    delay: stagger(100, { start: 800 })
  });
  
  // Continuous floating animation
  const floatingTimeline = createTimeline({ loop: true });
  
  elements.forEach((el, index) => {
    const x = parseFloat(el.style.left);
    const y = parseFloat(el.style.top);
    
    floatingTimeline.add(el, {
      translateX: [
        { to: Math.sin(index * 0.5) * 20, duration: 3000 + index * 200, ease: 'inOutSine' },
        { to: Math.cos(index * 0.3) * 15, duration: 2500 + index * 150, ease: 'inOutSine' }
      ],
      translateY: [
        { to: Math.cos(index * 0.4) * 15, duration: 2800 + index * 180, ease: 'inOutSine' },
        { to: Math.sin(index * 0.6) * 25, duration: 3200 + index * 220, ease: 'inOutSine' }
      ],
      opacity: [
        { to: 0.1, duration: 2000, ease: 'inOutSine' },
        { to: 0.4, duration: 2000, ease: 'inOutSine' }
      ],
      scale: [
        { to: 0.8, duration: 2500, ease: 'inOutSine' },
        { to: 1.2, duration: 2500, ease: 'inOutSine' }
      ]
    }, index * 100);
  });
}

function setupScrollAnimations() {
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  // Hide scroll indicator initially
  utils.set(scrollIndicator, { opacity: 0, scale: 0.8 });
  
  // Show scroll indicator on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    if (window.scrollY > 100) {
      animate(scrollIndicator, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 300,
        ease: 'outQuad'
      });
    } else {
      animate(scrollIndicator, {
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 300,
        ease: 'inQuad'
      });
    }
    
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 100) {
        animate(scrollIndicator, {
          opacity: [1, 0.6],
          duration: 500,
          ease: 'outQuad'
        });
      }
    }, 2000);
  });
  
  // Scroll to top functionality
  scrollIndicator.addEventListener('click', () => {
    animate(window, {
      scrollTop: [window.scrollY, 0],
      duration: 1000,
      ease: 'inOutQuart'
    });
  });
}

function setupCursorFollower() {
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Hide cursor follower initially
  utils.set(cursorFollower, { opacity: 0, scale: 0 });
  
  // Show cursor follower on mouse enter
  document.addEventListener('mouseenter', () => {
    animate(cursorFollower, {
      opacity: [0, 0.8],
      scale: [0, 1],
      duration: 300,
      ease: 'outQuad'
    });
  });
  
  // Hide cursor follower on mouse leave
  document.addEventListener('mouseleave', () => {
    animate(cursorFollower, {
      opacity: [0.8, 0],
      scale: [1, 0],
      duration: 300,
      ease: 'inQuad'
    });
  });
  
  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor following animation with closer tracking
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.3; // Increased from 0.1 to 0.3 for closer tracking
    cursorY += (mouseY - cursorY) * 0.3;
    
    animate(cursorFollower, {
      translateX: cursorX,
      translateY: cursorY,
      duration: 50, // Reduced duration for more responsive tracking
      ease: 'linear'
    });
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
  
  // Cursor effects on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .nav a, .logo');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      animate(cursorFollower, {
        scale: [1, 1.2],
        opacity: [0.6, 0.8],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      animate(cursorFollower, {
        scale: [1.2, 1],
        opacity: [0.8, 0.6],
        duration: 200,
        ease: 'outQuad'
      });
    });
  });
}

function createWorldAnimation() {
  const worldContainer = document.getElementById('world-container');
  const globe = document.getElementById('globe');
  
  // Create investment dots on the globe
  const investmentDots = [
    { x: 20, y: 30, delay: 0 },
    { x: 80, y: 25, delay: 500 },
    { x: 15, y: 70, delay: 1000 },
    { x: 85, y: 75, delay: 1500 },
    { x: 50, y: 20, delay: 2000 },
    { x: 30, y: 80, delay: 2500 },
    { x: 70, y: 60, delay: 3000 },
    { x: 40, y: 40, delay: 3500 }
  ];
  
  investmentDots.forEach((dot, index) => {
    const dotElement = document.createElement('div');
    dotElement.className = 'investment-dot';
    dotElement.style.left = dot.x + '%';
    dotElement.style.top = dot.y + '%';
    dotElement.style.animationDelay = dot.delay + 'ms';
    
    globe.appendChild(dotElement);
    
    // Animate dots appearing
    utils.set(dotElement, { scale: 0, opacity: 0 });
    animate(dotElement, {
      scale: [0, 1],
      opacity: [0, 0.8],
      duration: 800,
      ease: 'outElastic',
      delay: dot.delay + 1000
    });
  });
  
  // Create connecting lines between dots
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 4], [1, 5], [2, 6]
  ];
  
  connections.forEach((connection, index) => {
    const line = document.createElement('div');
    line.className = 'investment-line';
    
    const dot1 = investmentDots[connection[0]];
    const dot2 = investmentDots[connection[1]];
    
    const x1 = dot1.x;
    const y1 = dot1.y;
    const x2 = dot2.x;
    const y2 = dot2.y;
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = length + '%';
    line.style.left = x1 + '%';
    line.style.top = y1 + '%';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 50%';
    
    globe.appendChild(line);
    
    // Animate lines appearing
    utils.set(line, { scaleX: 0, opacity: 0 });
    animate(line, {
      scaleX: [0, 1],
      opacity: [0, 0.3],
      duration: 1000,
      ease: 'outQuad',
      delay: 2000 + index * 200
    });
  });
  
  // Create floating particles around the globe
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const angle = (i / 12) * Math.PI * 2;
    const radius = 250 + Math.random() * 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    particle.style.left = `calc(50% + ${x}px)`;
    particle.style.top = `calc(50% + ${y}px)`;
    particle.style.animationDelay = i * 500 + 'ms';
    
    worldContainer.appendChild(particle);
    
    // Animate particles appearing
    utils.set(particle, { scale: 0, opacity: 0 });
    animate(particle, {
      scale: [0, 1],
      opacity: [0, 0.6],
      duration: 600,
      ease: 'outQuad',
      delay: 3000 + i * 100
    });
  }
  
  // Globe rotation animation with smoother movement
  const globeTimeline = createTimeline({ loop: true });
  
  globeTimeline.add(globe, {
    rotateY: [0, 360],
    duration: 30000,
    ease: 'linear'
  });
  
  // Add subtle floating movement
  globeTimeline.add(globe, {
    translateY: [0, -10, 0],
    duration: 4000,
    ease: 'inOutSine'
  }, 0);
}

function setupHeroButton() {
  const heroButton = document.getElementById('hero-button');
  
  // Initial state
  utils.set(heroButton, { opacity: 0, translateY: 30 });
  
  // Animate button in
  animate(heroButton, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    ease: 'outQuad',
    delay: 1500
  });
  
  // Button click animation
  heroButton.addEventListener('click', () => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'var(--accent)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.opacity = '0.6';
    ripple.style.transform = 'translate(-50%, -50%)';
    
    const rect = heroButton.getBoundingClientRect();
    ripple.style.left = (rect.width / 2) + 'px';
    ripple.style.top = (rect.height / 2) + 'px';
    
    heroButton.appendChild(ripple);
    
    animate(ripple, {
      scale: [0, 3],
      opacity: [0.6, 0],
      duration: 600,
      ease: 'outQuad',
      onComplete: () => {
        heroButton.removeChild(ripple);
      }
    });
    
    // Button press animation
    animate(heroButton, {
      scale: [1, 0.95, 1],
      duration: 300,
      ease: 'outQuad'
    });
    
    // Simulate navigation (you can replace this with actual navigation)
    setTimeout(() => {
      console.log('Navigating to approach page...');
      // Add your navigation logic here
    }, 300);
  });
}

function setupInteractiveEffects() {
  // Logo animation on hover
  const logo = document.querySelector('.logo');
  const logoIcon = document.querySelector('.logo-icon');
  
  if (logo && logoIcon) {
    logo.addEventListener('mouseenter', () => {
      animate(logoIcon, {
        scale: [1, 1.1],
        rotate: [0, 5],
        duration: 300,
        ease: 'outQuad'
      });
    });
    
    logo.addEventListener('mouseleave', () => {
      animate(logoIcon, {
        scale: [1.1, 1],
        rotate: [5, 0],
        duration: 300,
        ease: 'outQuad'
      });
    });
  }
  
  // Navigation hover effects
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      animate(link, {
        translateY: [0, -2],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      animate(link, {
        translateY: [-2, 0],
        duration: 200,
        ease: 'outQuad'
      });
    });
  });
  
  // Newsletter form animations
  const newsletterInput = document.querySelector('.newsletter-input');
  const newsletterButton = document.querySelector('.newsletter-button');
  const newsletterForm = document.querySelector('.newsletter-form');
  
  // Only add event listeners if elements exist
  if (newsletterInput && newsletterButton) {
    newsletterInput.addEventListener('focus', () => {
      animate(newsletterInput, {
        scale: [1, 1.02],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    newsletterInput.addEventListener('blur', () => {
      animate(newsletterInput, {
        scale: [1.02, 1],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    newsletterButton.addEventListener('mouseenter', () => {
      animate(newsletterButton, {
        scale: [1, 1.05],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    newsletterButton.addEventListener('mouseleave', () => {
      animate(newsletterButton, {
        scale: [1.05, 1],
        duration: 200,
        ease: 'outQuad'
      });
    });
  }
  
  // Form submission animation
  if (newsletterForm && newsletterInput && newsletterButton) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterInput.value;
      if (email) {
        // Success animation
        animate(newsletterButton, {
          scale: [1, 0.9, 1.1, 1],
          duration: 600,
          ease: 'outQuad'
        });
        
        // Change button text temporarily
        const originalText = newsletterButton.textContent;
        newsletterButton.textContent = 'Subscribed!';
        
        setTimeout(() => {
          newsletterButton.textContent = originalText;
        }, 2000);
        
        newsletterInput.value = '';
      }
    });
  }
  

}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    
    animate(el, {
      translateY: yPos,
      duration: 100,
      ease: 'linear'
    });
  });
});

// Mouse movement effect for floating elements
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((el, index) => {
    const speed = 0.1 + (index * 0.02);
    
    animate(el, {
      translateX: mouseX * speed,
      translateY: mouseY * speed,
      duration: 1000,
      ease: 'outQuad'
    });
  });
});

// Add some particle effects on click
document.addEventListener('click', (e) => {
  const particle = document.createElement('div');
  particle.className = 'floating-element';
  particle.style.position = 'fixed';
  particle.style.left = e.clientX + 'px';
  particle.style.top = e.clientY + 'px';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '1000';
  
  document.body.appendChild(particle);
  
  animate(particle, {
    scale: [0, 1, 0],
    opacity: [0, 0.8, 0],
    translateX: [0, (Math.random() - 0.5) * 100],
    translateY: [0, (Math.random() - 0.5) * 100],
    duration: 1000,
    ease: 'outQuad',
    onComplete: () => {
      document.body.removeChild(particle);
    }
  });
});

function setupSectionAnimations() {
  // Services section animations
  const serviceCards = document.querySelectorAll('.service-card');
  
  const observerServices = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 800,
          ease: 'outQuad',
          delay: index * 200
        });
        observerServices.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  serviceCards.forEach(card => observerServices.observe(card));
  
  // Principles section animations
  const principleCards = document.querySelectorAll('.principle-card');
  
  const observerPrinciples = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          opacity: [0, 1],
          translateX: [-50, 0],
          duration: 800,
          ease: 'outQuad',
          delay: index * 150
        });
        observerPrinciples.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  principleCards.forEach(card => observerPrinciples.observe(card));
  
  // Team section animations
  const teamCards = document.querySelectorAll('.team-card');
  
  const observerTeam = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 1000,
          ease: 'outElastic',
          delay: index * 300
        });
        observerTeam.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  teamCards.forEach(card => observerTeam.observe(card));
  
  // Section headers animations
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  const observerHeaders = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const title = entry.target.querySelector('h2');
        const subtitle = entry.target.querySelector('.section-subtitle');
        
        animate(title, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          ease: 'outQuad'
        });
        
        if (subtitle) {
          animate(subtitle, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            ease: 'outQuad',
            delay: 200
          });
        }
        
        observerHeaders.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sectionHeaders.forEach(header => observerHeaders.observe(header));
}

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formInputs = contactForm.querySelectorAll('input, textarea');
  const contactButton = contactForm.querySelector('.contact-button');
  
  // Form inputs animation
  formInputs.forEach((input, index) => {
    utils.set(input, { opacity: 0, translateY: 20 });
    
    animate(input, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'outQuad',
      delay: index * 100
    });
    
    // Input focus animations
    input.addEventListener('focus', () => {
      animate(input, {
        scale: [1, 1.02],
        duration: 200,
        ease: 'outQuad'
      });
    });
    
    input.addEventListener('blur', () => {
      animate(input, {
        scale: [1.02, 1],
        duration: 200,
        ease: 'outQuad'
      });
    });
  });
  
  // Button animation
  utils.set(contactButton, { opacity: 0, translateY: 20 });
  animate(contactButton, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    ease: 'outQuad',
    delay: 400
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Success animation
    animate(contactButton, {
      scale: [1, 0.95, 1.05, 1],
      duration: 600,
      ease: 'outQuad'
    });
    
    // Change button text temporarily
    const originalText = contactButton.querySelector('span').textContent;
    contactButton.querySelector('span').textContent = '¡Mensaje Enviado!';
    
    // Reset form
    contactForm.reset();
    
    setTimeout(() => {
      contactButton.querySelector('span').textContent = originalText;
    }, 3000);
    
    // Send email (you can implement actual email sending here)
    console.log('Sending email to leonardo@scvatal.com');
  });
}

function setupMobileNavigation() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  console.log('Setting up mobile navigation...');
  console.log('Hamburger element:', hamburger);
  console.log('Mobile nav element:', mobileNav);
  console.log('Nav links:', navLinks);
  
  // Ensure mobile nav is hidden by default
  if (mobileNav) {
    mobileNav.classList.remove('active');
    console.log('Mobile nav initial state - active:', mobileNav.classList.contains('active'));
    console.log('Mobile nav initial display:', window.getComputedStyle(mobileNav).display);
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hamburger clicked!');
      
      const isActive = hamburger.classList.contains('active');
      
      if (isActive) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        console.log('Menu closed');
      } else {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        console.log('Menu opened');
      }
      
      console.log('Hamburger active:', hamburger.classList.contains('active'));
      console.log('Mobile nav active:', mobileNav.classList.contains('active'));
      console.log('Mobile nav display:', window.getComputedStyle(mobileNav).display);
      console.log('Mobile nav visibility:', window.getComputedStyle(mobileNav).visibility);
      console.log('Mobile nav opacity:', window.getComputedStyle(mobileNav).opacity);
      console.log('Mobile nav transform:', window.getComputedStyle(mobileNav).transform);
    });

    // Close mobile nav when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log('Nav link clicked, closing mobile nav');
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  } else {
    console.error('Hamburger or mobile nav elements not found!');
  }
}

function setupActiveSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Add active class to header when scrolling
    if (window.scrollY > 50) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  });
}

function setupDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  console.log('Setting up dark mode...');
  console.log('Theme toggle element:', themeToggle);
  
  if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
  }
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  console.log('Initial theme:', savedTheme);
  
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Theme toggle clicked!');
    
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Switching from', currentTheme, 'to', newTheme);
    
    // Force the theme change
    html.removeAttribute('data-theme');
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add smooth transition
    html.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      html.style.transition = '';
    }, 300);
    
    console.log('Theme updated to:', newTheme);
    console.log('Current data-theme attribute:', html.getAttribute('data-theme'));
  });
} 