document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. MOBILE MENU TOGGLE & LINK AUTO-CLOSE
       ========================================================================== */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const bars = menuToggle.querySelectorAll(".bar");
            bars[0].style.transform = navMenu.classList.contains("active") ? "rotate(45deg) translate(6px, 6px)" : "none";
            bars[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
            bars[2].style.transform = navMenu.classList.contains("active") ? "rotate(-45deg) translate(5px, -5px)" : "none";
        });
/*Digital Clock */
    function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    clock.textContent = `${h}:${m}:${s} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();



        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const bars = menuToggle.querySelectorAll(".bar");
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            });
        });
    }

    /* ==========================================================================
       2. SCROLL SPY (ACTIVE NAVIGATION LINKS)
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================================================
       3. TYPEWRITER EFFECT
       ========================================================================== */
    const typingTextElement = document.querySelector(".typing-text");
    const roles = ["Frontend Developer", "UI/UX Designer", "Software Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function handleTypewriter() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 120;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; 
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Typewriter running instantiation
    handleTypewriter();

    /* ==========================================================================
       4. ANIMATED SKILLS PROGRESS BARS (ON INTERSECTION)
       ========================================================================== */
    const progressBars = document.querySelectorAll(".progress");
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetPercentage = entry.target.getAttribute("data-progress");
                entry.target.style.width = targetPercentage;
                skillObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => skillObserver.observe(bar));

    /* ==========================================================================
       5. COUNTER ANIMATION ENGINE
       ========================================================================== */
    const counterNumbers = document.querySelectorAll(".counter-number");
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute("data-target"), 10);
                let startValue = 0;
                const duration = 2000; 
                const stepTime = Math.max(Math.floor(duration / targetValue), 15);
                
                const counterInterval = setInterval(() => {
                    startValue += Math.ceil(targetValue / (duration / stepTime));
                    if (startValue >= targetValue) {
                        counter.textContent = targetValue + "+";
                        clearInterval(counterInterval);
                    } else {
                        counter.textContent = startValue;
                    }
                }, stepTime);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counterNumbers.forEach(counter => counterObserver.observe(counter));

    /* ==========================================================================
       6. PORTFOLIO ISOTOPE FILTER FUNCTIONALITY
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active profiles from previous states
            filterButtons.forEach(button => button.classList.remove("active"));
            btn.classList.add("active");

            const targetCategory = btn.getAttribute("data-filter");

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (targetCategory === "all" || cardCategory === targetCategory) {
                    card.classList.remove("hide");
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

    /* ==========================================================================
       7. FAQ ACCORDION MANAGEMENT
       ========================================================================== */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector(".faq-answer");
            const isOpen = faqItem.classList.contains("active");

            // Close other open tabs safely
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Toggle custom selected profile accordion layout dynamically
            if (!isOpen) {
                faqItem.classList.add("active");
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       8. CONTACT FORM SUBMISSION HANDLER
       ========================================================================== */
    const contactForm = document.getElementById("portfolioContactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you, Zainab! Your message mockup pipeline has executed successfully. (Backend integration required).");
            contactForm.reset();
        });
    }
});