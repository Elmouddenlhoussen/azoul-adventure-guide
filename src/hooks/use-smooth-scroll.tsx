
import { useEffect } from 'react';

// Smooth scroll hook for improved scrolling experience
export const useSmoothScroll = () => {
  useEffect(() => {
    // Save the original scroll behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    
    // Apply smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add a class for additional scroll animations
    document.body.classList.add('smooth-scroll-enabled');
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle;
      document.body.classList.remove('smooth-scroll-enabled');
    };
  }, []);
};

// Function to scroll to a specific element with animation
export const scrollToElement = (elementId: string, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Function to scroll to top with animation
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
