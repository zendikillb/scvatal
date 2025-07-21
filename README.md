# SCVATAL Landing Page

A modern, animated landing page for SCVATAL investment company, inspired by the Sequoia Capital design with smooth animations powered by anime.js.

## Features

- **Modern Design**: Clean, minimalist design inspired by Sequoia Capital's landing page
- **Smooth Animations**: Interactive animations using anime.js library
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, scroll animations, and particle effects
- **Performance Optimized**: Efficient animations that don't impact performance

## Animations Included

1. **Hero Text Animation**: Fade-in and slide-up animation for the main headline
2. **Floating Particles**: Dynamic floating elements that respond to mouse movement
3. **Scroll Effects**: Parallax scrolling and scroll-to-top functionality
4. **Interactive Hover Effects**: Logo, navigation, and button hover animations
5. **Form Animations**: Input focus effects and submission feedback
6. **Particle Effects**: Click-to-create particle animations

## Technologies Used

- HTML5
- CSS3 (with CSS Custom Properties)
- JavaScript (ES6+)
- anime.js (for animations)
- Google Fonts (Inter & Playfair Display)

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The page will load with all animations automatically

## File Structure

```
├── index.html          # Main HTML file
├── script.js           # JavaScript animations
├── anime.esm.js        # anime.js library
└── README.md           # This file
```

## Customization

### Colors
The color scheme can be easily customized by modifying the CSS custom properties in the `:root` selector:

```css
:root {
  --black: #1a1a1a;
  --white: #f8f8f8;
  --gray: #6b7280;
  --light-gray: #e5e7eb;
  --accent: #10b981;
  --accent-dark: #059669;
  --background: #fafafa;
}
```

### Animations
All animations are controlled through the `script.js` file. You can modify timing, easing, and effects by editing the animation parameters.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## Credits

- Design inspiration: Sequoia Capital
- Animation library: anime.js
- Fonts: Google Fonts (Inter & Playfair Display)