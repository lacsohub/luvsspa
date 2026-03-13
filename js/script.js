document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('fa-times');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('fa-times');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Testimonials Slider
    const testimonialItems = [
        { text: "The best spa experience I've ever had. The atmosphere is so peaceful and the therapists are truly skilled.", author: "Sarah Johnson" },
        { text: "A truly luxurious escape in the heart of the city. Every detail was perfect, from the music to the massage.", author: "Michael Chen" },
        { text: "Luvs Spa is my go-to for rejuvenation. Their aromatherapy is divine and the staff is incredibly professional.", author: "Priya Sharma" }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.querySelector('.testimonial-item p');
    const testimonialAuthor = document.querySelector('.testimonial-author');

    if (testimonialText && testimonialAuthor) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            testimonialText.style.opacity = '0';
            testimonialAuthor.style.opacity = '0';
            
            setTimeout(() => {
                testimonialText.textContent = `"${testimonialItems[currentTestimonial].text}"`;
                testimonialAuthor.textContent = `- ${testimonialItems[currentTestimonial].author}`;
                testimonialText.style.opacity = '1';
                testimonialAuthor.style.opacity = '1';
            }, 500);
        }, 5000);
    }

    // Scroll Reveal refinement
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // Mobile navigation active state fix
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // WhatsApp Booking
    const whatsappButtons = document.querySelectorAll('.whatsapp-booking');
    const phoneNumber = '919978637568'; // Integrated with user's number
    const message = encodeURIComponent('Hello Luvs Spa, I would like to book a session.');

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });
});
