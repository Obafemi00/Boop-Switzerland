        // Mobile Menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');

        // Typing Animation
        const taglines = [
            "Signature storytelling.",
            "Global impact.",
            "One Story at a Time..."
        ];

        class TypingAnimation {
            constructor(element, words, typeSpeed = 100, eraseSpeed = 50, pauseTime = 2000) {
                this.element = element;
                this.words = words;
                this.typeSpeed = typeSpeed;
                this.eraseSpeed = eraseSpeed;
                this.pauseTime = pauseTime;
                this.currentWordIndex = 0;
                this.isDeleting = false;
                this.text = '';
            }

            type() {
                const currentWord = this.words[this.currentWordIndex];
                
                if (this.isDeleting) {
                    // Remove characters
                    this.text = currentWord.substring(0, this.text.length - 1);
                    this.element.classList.add('typing');
                } else {
                    // Add characters
                    this.text = currentWord.substring(0, this.text.length + 1);
                }

                this.element.textContent = this.text;

                let typeSpeed = this.isDeleting ? this.eraseSpeed : this.typeSpeed;

                if (!this.isDeleting && this.text === currentWord) {
                    // Word is complete, pause before deleting
                    typeSpeed = this.pauseTime;
                    this.isDeleting = true;
                    this.element.classList.remove('typing');
                    this.element.classList.add('paused');
                } else if (this.isDeleting && this.text === '') {
                    // Word is deleted, move to next word
                    this.isDeleting = false;
                    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                    typeSpeed = 500; // Pause before typing next word
                    this.element.classList.remove('paused');
                    this.element.classList.add('typing');
                }

                setTimeout(() => this.type(), typeSpeed);
            }
        }

        // Initialize typing animation if element exists
        document.addEventListener('DOMContentLoaded', function() {
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
                const typingAnimation = new TypingAnimation(typingElement, taglines);
                typingAnimation.type();
            }
        });

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

        // Check if we're on the home page or services page
        const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        
        const servicesData = {
            'tv-film': {
                image: isHomePage ? './images/tv-film.jpg' : '../images/tv-film.jpg',
                title: 'TV & Film Production',
                description: 'Professional production services for television and film projects. We handle everything from concept to post-production, ensuring high-quality visual storytelling that captivates your audience.',
                link: isHomePage ? './pages/services.html' : './services.html'
            },
            'media-consulting': {
                image: isHomePage ? './images/media.jpg' : '../images/media.jpg',
                title: 'Media Consulting',
                description: 'Expert advice and strategic planning for media projects. We help you navigate the complex media landscape, optimize your presence, and achieve your communication goals.',
                link: isHomePage ? './pages/services.html' : './services.html'
            },
            'project-management': {
                image: isHomePage ? './images/project-management.jpg' : '../images/project-management.jpg',
                title: 'Project Management',
                description: 'Comprehensive project management for media initiatives, ensuring smooth execution from start to finish. Our meticulous approach guarantees projects are delivered on time and within budget.',
                link: isHomePage ? './pages/services.html' : './services.html'
            },
            'brand-collaborations': {
                image: isHomePage ? './images/brand-colab.jpg' : '../images/brand-colab.jpg',
                title: 'Brand Collaborations',
                description: 'Strategic partnerships to enhance brand visibility and impact. We connect brands with influential media personalities and platforms for mutually beneficial campaigns.',
                link: isHomePage ? './pages/services.html' : './services.html'
            },
            'talent-development': {
                image: isHomePage ? './images/talent-dev.jpg' : '../images/talent-dev.jpg',
                title: 'Talent Development',
                description: 'Nurturing and developing talent in the media industry. We provide coaching, training, and strategic guidance to help individuals hone their skills and achieve their full potential.',
                link: isHomePage ? './pages/services.html' : './services.html'
            }
        };

        // Preload service images to prevent flashing on change
        if (isHomePage || window.location.pathname.includes('services.html')) {
            Object.values(servicesData).forEach(service => {
                const img = new Image();
                img.src = service.image;
            });
        }

        const categoryTabs = document.querySelectorAll('.category-tab');
        const carouselImage = document.querySelector('.carousel-image');
        const serviceTitle = document.querySelector('.service-title');
        const serviceDescription = document.querySelector('.service-description');
        const serviceCtaButton = document.querySelector('.service-content-area .cta-button');
        const serviceContentArea = document.querySelector('.service-content-area');

        let currentService = 'tv-film'; // Default active service
        let isInitialLoad = true;

        function updateServiceContent() {
            const data = servicesData[currentService];
            const contentElements = [carouselImage, serviceTitle, serviceDescription, serviceCtaButton];

            // Function to fade in elements
            const fadeIn = () => {
                if (carouselImage) carouselImage.style.opacity = '1';
                if (serviceTitle) serviceTitle.style.opacity = '1';
                if (serviceDescription) serviceDescription.style.opacity = '1';
                if (serviceCtaButton) serviceCtaButton.style.opacity = '1';
            };

            // On initial page load, just set the content without animation
            if (isInitialLoad) {
                if (carouselImage) carouselImage.src = data.image;
                if (serviceTitle) serviceTitle.textContent = data.title;
                if (serviceDescription) serviceDescription.textContent = data.description;
                if (serviceCtaButton) {
                    serviceCtaButton.href = data.link;
                    serviceCtaButton.textContent = `Explore ${data.title} \u2192`;
                }
                fadeIn();
                isInitialLoad = false;
                return;
            }

            // For subsequent clicks, fade out, update, then fade in
            contentElements.forEach(el => el && (el.style.opacity = '0'));

            setTimeout(() => {
                if (carouselImage) carouselImage.src = data.image;
                if (serviceTitle) serviceTitle.textContent = data.title;
                if (serviceDescription) serviceDescription.textContent = data.description;
                if (serviceCtaButton) {
                    serviceCtaButton.href = data.link;
                    serviceCtaButton.textContent = `Explore ${data.title} \u2192`;
                }
                
                // Use image.onload to ensure the image is ready before fading in
                if (carouselImage) {
                    carouselImage.onload = fadeIn;
                } else {
                    fadeIn();
                }
            }, 350); // Corresponds to CSS transition time
        }

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const newService = tab.dataset.service;
                if (newService === currentService) return;

                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentService = tab.dataset.service;
                updateServiceContent();
            });
        });

        // Initialize content on load
        if (serviceContentArea) {
            updateServiceContent();
        }

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

        // Home navbar scroll effect: white background only after scrolling past hero
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.clean-navbar');
            const hero = document.querySelector('.home-hero');
            if (!navbar || !hero) return;
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom <= 0) {
                navbar.classList.add('beyond-hero');
            } else {
                navbar.classList.remove('beyond-hero');
            }
        });

        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
        const serviceKeys = Object.keys(servicesData);

        function goToService(index) {
            // Remove animation class for fade-out
            const contentArea = document.querySelector('.service-content-area');
            if (contentArea) {
                contentArea.classList.remove('fade-in');
                contentArea.classList.add('fade-out');
            }
            setTimeout(() => {
                currentService = serviceKeys[index];
                // Update active tab immediately
                categoryTabs.forEach((tab, i) => {
                    tab.classList.toggle('active', i === index);
                });
                updateServiceContent();
                if (contentArea) {
                    contentArea.classList.remove('fade-out');
                    contentArea.classList.add('fade-in');
                }
            }, 150); // Duration matches CSS fade-out
        }

        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => {
                let currentIndex = serviceKeys.indexOf(currentService);
                let prevIndex = (currentIndex - 1 + serviceKeys.length) % serviceKeys.length;
                goToService(prevIndex);
            });
            rightArrow.addEventListener('click', () => {
                let currentIndex = serviceKeys.indexOf(currentService);
                let nextIndex = (currentIndex + 1) % serviceKeys.length;
                goToService(nextIndex);
            });
        }

        // On page load, add fade-in to content area
        const contentAreaInit = document.querySelector('.service-content-area');
        if (contentAreaInit) {
            contentAreaInit.classList.add('fade-in');
        }