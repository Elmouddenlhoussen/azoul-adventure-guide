
export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else if (!entry.target.classList.contains('once')) {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // For staggered list animations
  const staggerContainers = document.querySelectorAll('.stagger-container');
  
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, 100 * index);
        });
      }
    });
  }, { threshold: 0.1 });

  staggerContainers.forEach(container => {
    staggerObserver.observe(container);
  });

  return () => {
    animatedElements.forEach(element => {
      observer.unobserve(element);
    });
    
    staggerContainers.forEach(container => {
      staggerObserver.unobserve(container);
    });
  };
};
