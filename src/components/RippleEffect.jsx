import { useEffect } from 'react';
import './styles/RippleEffect.css';

/**
 * RippleEffect Component
 * Creates a ripple animation effect on click anywhere in the document
 * Assisted by Claude AI 
 */
const RippleEffect = () => {
  useEffect(() => {
    // Creates and manages the ripple effect elements
    const createRipple = (event) => {
      // Create ripple elements
      const ripple = document.createElement('div');
      const rippleContainer = document.createElement('div');
      
      // Add necessary classes
      rippleContainer.className = 'ripple-effect';
      ripple.className = 'ripple';
      
      // Position the ripple at click coordinates
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      
      // Append elements to DOM
      rippleContainer.appendChild(ripple);
      document.body.appendChild(rippleContainer);

      // Clean up after animation ends
      ripple.addEventListener('animationend', () => {
        rippleContainer.remove();
      });
    };

    // Add click event listener
    document.addEventListener('click', createRipple);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', createRipple);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // Component doesn't render any visible elements
};

export default RippleEffect;