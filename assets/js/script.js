// Mobile menu toggle
(function() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!burger.contains(event.target) && !nav.contains(event.target)) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
})();


// FAQ Accordion
(function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });
})();

// Smooth scroll for anchor links
(function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || href === '#login' || href === '#register' || href === '#go') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Get target position relative to viewport
                const targetRect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = targetRect.top + scrollTop - headerHeight - 20; // 20px extra spacing
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
})();


// Header scroll effect
(function() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
            
            lastScroll = currentScroll;
        });
    }
})();

// Search Modal
(function() {
    const searchButton = document.getElementById('header-search');
    const searchModal = document.getElementById('search-modal');
    const searchModalOverlay = document.getElementById('search-modal-overlay');
    const searchModalClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    function openSearchModal() {
        if (searchModalOverlay) {
            searchModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus on search input after animation
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        }
    }

    function closeSearchModal() {
        if (searchModalOverlay) {
            searchModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (searchInput) {
                searchInput.value = '';
                if (searchResults) {
                    searchResults.innerHTML = '<p class="search-placeholder">Enter your search query...</p>';
                }
            }
        }
    }

    // Open modal on search button click
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }

    // Close modal
    if (searchModalClose) {
        searchModalClose.addEventListener('click', closeSearchModal);
    }

    if (searchModalOverlay) {
        searchModalOverlay.addEventListener('click', function(e) {
            if (e.target === searchModalOverlay) {
                closeSearchModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModalOverlay && searchModalOverlay.classList.contains('active')) {
            closeSearchModal();
        }
    });

    // Search functionality (demo)
    if (searchInput && searchResults) {
        const searchItems = [
            { title: 'Account Registration at Casoola', text: 'Learn how to register and create your account', href: '#registration' },
            { title: 'Key Specifications', text: 'Discover all important technical and legal details', href: '#key-facts' },
            { title: 'Game Library', text: 'Browse our collection of over 4,000 games', href: '#games' },
            { title: 'Welcome Bonuses', text: 'View all bonus offers and promotions', href: '#bonuses' },
            { title: 'Gamification & Shop', text: 'Learn more about the unique gamification system', href: '#gamification' },
            { title: 'Banking & Cashier', text: 'Information on deposit and withdrawal methods', href: '#banking' },
            { title: 'Support & Security', text: 'Learn more about customer service and security', href: '#advantages' },
            { title: 'FAQ', text: 'Find answers to frequently asked questions', href: '#faq' },
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Enter your search query...</p>';
                return;
            }

            const filtered = searchItems.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.text.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">No results found. Try a different search.</p>';
                return;
            }

            const resultsHTML = '<ul class="search-results__list">' +
                filtered.map(item => `
                    <li class="search-results__item" data-href="${item.href}">
                        <div class="search-results__title">${item.title}</div>
                        <div class="search-results__text">${item.text}</div>
                    </li>
                `).join('') +
                '</ul>';

            searchResults.innerHTML = resultsHTML;

            // Add click handlers to results
            const resultItems = searchResults.querySelectorAll('.search-results__item');
            resultItems.forEach(item => {
                item.addEventListener('click', function() {
                    const href = this.getAttribute('data-href');
                    if (href) {
                        closeSearchModal();
                        setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) {
                                const headerHeight = document.querySelector('.header').offsetHeight;
                                const targetPosition = target.offsetTop - headerHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }, 300);
                    }
                });
            });
        });
    }
})();


// Game Categories Tabs Functionality
(function() {
    const categoryTabs = document.querySelectorAll('.game-category-tab');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                console.log('Selected category:', category);
                // Here you can add logic to filter games by category
                // For now, just update the active state
            });
        });
    }
})();

// Spin Rally Countdown Timer
(function() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    function updateCountdown(element, minutes, seconds) {
        const mins = String(minutes).padStart(2, '0');
        const secs = String(seconds).padStart(2, '0');
        element.textContent = `${mins}:${secs}`;
    }
    
    function startCountdown(element, initialMinutes = 20) {
        let totalSeconds = initialMinutes * 60;
        
        const interval = setInterval(() => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            updateCountdown(element, minutes, seconds);
            
            if (totalSeconds <= 0) {
                clearInterval(interval);
                // Reset to 20 minutes when countdown reaches 0
                totalSeconds = 20 * 60;
                setTimeout(() => startCountdown(element, 20), 1000);
            } else {
                totalSeconds--;
            }
        }, 1000);
    }
    
    countdownElements.forEach(element => {
        // Parse initial time from element text (format: "MM:SS")
        const initialText = element.textContent.trim();
        const [mins, secs] = initialText.split(':').map(Number);
        const initialMinutes = (mins || 20) + (secs || 0) / 60;
        
        startCountdown(element, Math.ceil(initialMinutes));
    });
})();

// Welcome Banner Slider
(function() {
    const welcomeBannerSlider = document.querySelector('.welcome-banner__slider');
    
    if (!welcomeBannerSlider) return;
    
    const welcomeSlides = welcomeBannerSlider.querySelectorAll('.welcome-banner__slide');
    
    if (welcomeSlides.length === 0) return;
    
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Remove active class from all slides
        welcomeSlides.forEach((slide, i) => {
            slide.classList.remove('welcome-banner__slide--active');
        });
        
        // Add active class to current slide
        if (welcomeSlides[index]) {
            welcomeSlides[index].classList.add('welcome-banner__slide--active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % welcomeSlides.length;
        showSlide(next);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // Pause autoplay on hover
    welcomeBannerSlider.addEventListener('mouseenter', stopAutoplay);
    welcomeBannerSlider.addEventListener('mouseleave', startAutoplay);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    welcomeBannerSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });
    
    welcomeBannerSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            const prev = (currentSlide - 1 + welcomeSlides.length) % welcomeSlides.length;
            showSlide(prev);
        }
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start autoplay
    startAutoplay();
})();
