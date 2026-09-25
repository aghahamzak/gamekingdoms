/*==================================================
GAME KINGDOMS
Premium Website Script
==================================================*/

// ==========================================
// SELECT ELEMENTS
// ==========================================

const navbar = document.querySelector("header");

const menu = document.querySelector(".menu");

const menuToggle = document.querySelector(".menu-toggle");

const menuLinks = document.querySelectorAll(".menu a");


// ==========================================
// MOBILE MENU
// ==========================================

if (menuToggle) menuToggle.addEventListener("click", () => {

    menu.classList.toggle("show-menu");

    const icon = menuToggle.querySelector("i");

    if (menu.classList.contains("show-menu")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

    else{

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


// ==========================================
// CLOSE MENU AFTER CLICK
// ==========================================

menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        menu.classList.remove("show-menu");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// ==========================================
// STICKY NAVBAR EFFECT
// ==========================================

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        navbar.classList.add("sticky");

    }

    else{

        navbar.classList.remove("sticky");

    }

});


// ==========================================
// ACTIVE MENU LINK
// ==========================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop-150;

        if(window.scrollY>=sectionTop){

            current = section.getAttribute("id");

        }

    });

    menuLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


// ==========================================
// HERO IMAGE FLOAT
// ==========================================

const heroImage = document.querySelector(".hero-right img");

let direction = 1;

setInterval(()=>{

    let current = parseFloat(heroImage.dataset.pos || 0);

    current += direction;

    if(current>10){

        direction = -1;

    }

    if(current<-10){

        direction = 1;

    }

    heroImage.style.transform = `translateY(${current}px)`;

    heroImage.dataset.pos = current;

},80);
/*==================================================
SCROLL REVEAL ANIMATION
==================================================*/

const revealElements = document.querySelectorAll(
    ".section-title, .about-card, .game-card, .feature-box, .mission-card, .contact-form, .contact-info"
);

const revealOnScroll = () => {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("reveal");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/*==================================================
ANIMATED COUNTERS
==================================================*/

const counters = document.querySelectorAll(".hero-stats h2");

const startCounter = () => {

    counters.forEach(counter => {

        let target = parseInt(counter.innerText);

        if (isNaN(target)) return;

        let count = 0;

        let speed = target / 80;

        const updateCounter = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count) + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

    });

};

startCounter();


/*==================================================
BUTTON RIPPLE EFFECT
==================================================*/

const buttons = document.querySelectorAll(
    ".primary-btn,.secondary-btn,.contact-form button"
);

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*==================================================
CONTACT FORM VALIDATION
==================================================*/

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = this.querySelector('input[type="text"]');

        const email = this.querySelector('input[type="email"]');

        const message = this.querySelector("textarea");

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("Please complete all required fields.");

            return;

        }

        alert("Thank you! Your message has been recorded.");

        this.reset();

    });

}


/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/*==================================================
BACK TO TOP BUTTON
==================================================*/

const backToTop = document.createElement("button");

backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

backToTop.className = "back-to-top";

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show-top");

    } else {

        backToTop.classList.remove("show-top");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*==================================================
NAVBAR HIDE / SHOW
==================================================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 120) {

        navbar.style.transform = "translateY(-100%)";

    } else {

        navbar.style.transform = "translateY(0)";

    }

    lastScroll = currentScroll;

});


/*==================================================
PARALLAX HERO
==================================================*/

window.addEventListener("scroll", () => {

    const scrolled = window.pageYOffset;

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.backgroundPositionY = scrolled * 0.3 + "px";

    }

});


/*==================================================
GAME CARD TILT EFFECT
==================================================*/

const cards = document.querySelectorAll(".game-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;

        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/*==================================================
PRELOADER
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*==================================================
CONSOLE MESSAGE
==================================================*/

console.log(
"%cGAME KINGDOMS SMC-PRIVATE LIMITED",
"color:#00d4ff;font-size:22px;font-weight:bold;"
);

console.log(
"%cWebsite Developed Successfully",
"color:#7a5cff;font-size:15px;"
);