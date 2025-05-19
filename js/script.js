// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
    
    // Remove preloader after page loads
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 500);
    
    // Show plant animation after 2 seconds
    setTimeout(function() {
        document.querySelector('.plant-animation').classList.add('visible');
    }, 2000);
    
    // Activate scrollspy for navbar
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function onScroll() {
        const scrollPos = window.scrollY;
        
        // Change navbar background on scroll
        if (scrollPos > 50) {
            document.querySelector('.navbar').style.padding = '10px 0';
            document.querySelector('.navbar').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            document.querySelector('.navbar').style.padding = '15px 0';
            document.querySelector('.navbar').style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Update active nav link based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#') && link.getAttribute('href') !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        }
    });
});

// Handle dark/light mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});