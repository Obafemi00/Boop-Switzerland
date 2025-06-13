        // Mobile Menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll Animations
        const animateElements = document.querySelectorAll('.animate');

        function checkScroll() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);

        // Contact Form
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const form = e.target;
                    const formStatus = document.getElementById('formStatus');
                    formStatus.textContent = '';
                    formStatus.style.color = '';
                    const data = new FormData(form);
                    try {
                        const response = await fetch('../php/contact.php', {
                            method: 'POST',
                            body: data
                        });
                        const result = await response.json();
                        if (result.success) {
                            formStatus.textContent = 'Thank you! Your message has been sent.';
                            formStatus.style.color = '#17918B';
                            form.reset();
                        } else {
                            formStatus.textContent = result.error || 'Something went wrong. Please try again.';
                            formStatus.style.color = '#E28C82';
                        }
                    } catch (err) {
                        formStatus.textContent = 'Could not send message. Please try again later.';
                        formStatus.style.color = '#E28C82';
                    }
                });
            }
        });

        // Interactive Services Section
        const servicesData = {
            'tv-film': {
                images: [
                    '../images/tv-film-1.jpg',
                    '../images/tv-film-2.jpg',
                    '../images/tv-film-3.jpg'
                ],
                title: 'TV & Film Production',
                description: 'Professional production services for television and film projects. We handle everything from concept to post-production, ensuring high-quality visual storytelling that captivates your audience.',
                link: './pages/services.html'
            },
            'media-consulting': {
                images: [
                    '../images/media-consulting-1.jpg',
                    '../images/media-consulting-2.jpg'
                ],
                title: 'Media Consulting',
                description: 'Expert advice and strategic planning for media projects. We help you navigate the complex media landscape, optimize your presence, and achieve your communication goals.',
                link: './pages/services.html'
            },
            'project-management': {
                images: [
                    '../images/project-management-1.jpg',
                    '../images/project-management-2.jpg',
                    '../images/project-management-3.jpg'
                ],
                title: 'Project Management',
                description: 'Comprehensive project management for media initiatives, ensuring smooth execution from start to finish. Our meticulous approach guarantees projects are delivered on time and within budget.',
                link: './pages/services.html'
            },
            'brand-collaborations': {
                images: [
                    '../images/brand-collaborations-1.jpg',
                    '../images/brand-collaborations-2.jpg'
                ],
                title: 'Brand Collaborations',
                description: 'Strategic partnerships to enhance brand visibility and impact. We connect brands with influential media personalities and platforms for mutually beneficial campaigns.',
                link: './pages/services.html'
            },
            'talent-development': {
                images: [
                    '../images/talent-development-1.jpg',
                    '../images/talent-development-2.jpg',
                    '../images/talent-development-3.jpg'
                ],
                title: 'Talent Development',
                description: 'Nurturing and developing talent in the media industry. We provide coaching, training, and strategic guidance to help individuals hone their skills and achieve their full potential.',
                link: './pages/services.html'
            }
        };

        const categoryTabs = document.querySelectorAll('.category-tab');
        const carouselImage = document.querySelector('.carousel-image');
        const imageCounter = document.querySelector('.image-counter');
        const serviceTitle = document.querySelector('.service-title');
        const serviceDescription = document.querySelector('.service-description');
        const serviceCtaButton = document.querySelector('.service-content-area .cta-button');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        let currentService = 'tv-film'; // Default active service
        let currentImageIndex = 0;

        function updateServiceContent() {
            const data = servicesData[currentService];
            carouselImage.src = data.images[currentImageIndex];
            imageCounter.textContent = `${currentImageIndex + 1}/${data.images.length}`;
            serviceTitle.textContent = data.title;
            serviceDescription.textContent = data.description;
            serviceCtaButton.href = data.link; // Set the href for the CTA button
            serviceCtaButton.textContent = `Explore ${data.title} \u2192`; // Update button text with arrow
        }

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentService = tab.dataset.service;
                currentImageIndex = 0; // Reset image index when changing service
                updateServiceContent();
            });
        });

        leftArrow.addEventListener('click', () => {
            const data = servicesData[currentService];
            currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
            updateServiceContent();
        });

        rightArrow.addEventListener('click', () => {
            const data = servicesData[currentService];
            currentImageIndex = (currentImageIndex + 1) % data.images.length;
            updateServiceContent();
        });

        // Initialize content on load
        updateServiceContent();

        // Paralax effect
        document.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero');

            parallaxElements.forEach(function(element) {
                const speed = parseFloat(element.dataset.parallaxSpeed || 0.5);
                const yPos = -(scrolled * speed);
                element.style.transform = 'translateY(' + yPos + 'px)';
            });
        }); 