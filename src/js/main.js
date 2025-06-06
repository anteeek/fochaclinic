// Mobile menu toggle
const mobileMenuButton = document.querySelector('button.md\\:hidden');
const mobileMenu = document.querySelector('.md\\:hidden.hidden');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString('pl-PL');
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString('pl-PL');
        }
    }
    update();
}

function handleCounterAnimation() {
    const section = document.getElementById('counter-section');
    const counters = section.querySelectorAll('.counter');
    let animated = false;
    function onScroll() {
        const rect = section.getBoundingClientRect();
        if (!animated && rect.top < window.innerHeight && rect.bottom > 0) {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                animateCounter(counter, target);
            });
            animated = true;
            window.removeEventListener('scroll', onScroll);
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
}

document.addEventListener('DOMContentLoaded', handleCounterAnimation);

// Service tabs switching
function handleServiceTabs() {
    const tabs = document.querySelectorAll('#service-tabs button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active styles from all tabs
            tabs.forEach(t => {
                t.classList.remove('text-[#B4CBD1]', 'border-b-2', 'border-[#B4CBD1]');
                t.classList.add('text-gray-500');
            });
            // Add active styles to clicked tab
            this.classList.add('text-[#B4CBD1]', 'border-b-2', 'border-[#B4CBD1]');
            this.classList.remove('text-gray-500');
            // Show corresponding tab content
            const tabName = this.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.getAttribute('data-tab-content') === tabName) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', handleServiceTabs);

// Expand/collapse extra chips
function handleExpandChips() {
    const expandBtn = document.getElementById('expand-chips-btn');
    const getActiveTabContent = () => {
        return document.querySelector('.tab-content:not(.hidden)');
    };
    expandBtn.addEventListener('click', function () {
        const activeTab = getActiveTabContent();
        const extraChips = activeTab.querySelectorAll('.extra-chip');
        const isExpanded = extraChips[0] && !extraChips[0].classList.contains('hidden');
        extraChips.forEach(chip => {
            chip.classList.toggle('hidden', isExpanded);
        });
        expandBtn.textContent = isExpanded ? 'Rozwiń więcej' : 'Zwiń';
    });
    // Hide extra chips when switching tabs
    document.querySelectorAll('#service-tabs button').forEach(tab => {
        tab.addEventListener('click', () => {
            const allTabContents = document.querySelectorAll('.tab-content');
            allTabContents.forEach(tabContent => {
                tabContent.querySelectorAll('.extra-chip').forEach(chip => chip.classList.add('hidden'));
            });
            expandBtn.textContent = 'Rozwiń więcej';
        });
    });
}
document.addEventListener('DOMContentLoaded', handleExpandChips);

// Opinions carousel
function handleOpinionsCarousel() {
    const carousel = document.getElementById('opinions-carousel');
    const slides = Array.from(carousel.querySelectorAll('.opinion-slide'));
    const prevBtn = document.getElementById('opinions-prev');
    const nextBtn = document.getElementById('opinions-next');
    const dotsContainer = document.getElementById('opinions-dots');
    let current = 0;
    let slidesToShow = 3;

    function updateSlidesToShow() {
        slidesToShow = window.innerWidth < 768 ? 1 : 3;
    }

    function updateCarousel() {
        updateSlidesToShow();
        const slideWidth = 100 / slidesToShow;
        carousel.style.transform = `translateX(-${current * slideWidth}%)`;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}%`;
        });
        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const total = Math.max(1, slides.length - slidesToShow + 1);
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full ' + (i === current ? 'bg-[#B4CBD1]' : 'bg-gray-300') + ' focus:outline-none';
            dot.addEventListener('click', () => {
                current = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(idx) {
        const total = Math.max(1, slides.length - slidesToShow + 1);
        current = Math.max(0, Math.min(idx, total - 1));
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(current - 1);
    });
    nextBtn.addEventListener('click', () => {
        goToSlide(current + 1);
    });

    window.addEventListener('resize', () => {
        updateSlidesToShow();
        // Clamp current to valid range after resize
        goToSlide(current);
    });

    // Initialize
    updateSlidesToShow();
    goToSlide(0);
}
document.addEventListener('DOMContentLoaded', handleOpinionsCarousel); 