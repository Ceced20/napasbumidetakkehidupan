document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
     
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const mobileNavLinks = document.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date('May 27, 2025 19:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft <= 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
    
    // Initial countdown and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Schedule Tab Switching
  const scheduleTabs = document.querySelectorAll('.schedule-tab');
  const timelineContainers = document.querySelectorAll('.timeline');
  const dateDisplay = document.querySelector('.date-container span');
  
  scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      scheduleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected timeline
      const dateId = tab.getAttribute('data-date');
      timelineContainers.forEach(timeline => {
        timeline.classList.remove('active');
      });
      document.getElementById(dateId).classList.add('active');
      
      // Update the date display
      if (dateId === 'may-27') {
        dateDisplay.textContent = 'May 27, 2025';
      } else {
        dateDisplay.textContent = 'May 28, 2025';
      }
    });
  });
    
    // Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-overlay p');
            
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.textContent = caption.textContent;
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Formspree handle the submission
            // We'll just add some UI feedback here
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // We'll re-enable the button after submission
            // Note: Formspree will handle the actual redirect
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate position with navbar offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Get scroll position with offset for navbar
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navHeight - 10) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active menu item on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Set active link initially
    setActiveNavLink();
    
    // Disable right-click on gallery images (optional)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });
    
    // Logo image - updated to use the new logo
    const logoImage = document.createElement('img');
    logoImage.src = 'public/lovable-uploads/63ddf673-224c-4942-b29e-0b41b7e581b7.png';
    logoImage.onload = function() {
        const logoCircles = document.querySelectorAll('.logo-circle, .logo-circle-medium');
        logoCircles.forEach(circle => {
            // Clear existing content
            circle.innerHTML = '';
            // Add logo image
            const imgClone = logoImage.cloneNode(true);
            imgClone.style.width = '100%';
            imgClone.style.height = '100%';
            imgClone.style.objectFit = 'contain';
            circle.appendChild(imgClone);
        });
    };
});
