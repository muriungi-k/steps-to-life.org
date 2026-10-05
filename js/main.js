/*=====================================================
    STEPS TO LIFE - MAIN.JS
=====================================================*/

/*------------------------------------
    Navbar Background
------------------------------------*/

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,.75)";
    } else {
        header.style.background = "rgba(0,0,0,.20)";
    }

});


/*------------------------------------
    Navbar Scroll Effect
------------------------------------*/

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 50);

});


/*------------------------------------
    Counter Animation
------------------------------------*/

document.querySelectorAll(".counter").forEach(counter => {

    const target = Number(counter.dataset.target);

    let current = 0;

    function update(){

        const increment = Math.max(1, Math.ceil(target / 100));

        current += increment;

        if(current >= target){

            counter.innerText = target.toLocaleString();

        }else{

            counter.innerText = current.toLocaleString();

            requestAnimationFrame(update);

        }

    }

    update();

});


/*------------------------------------
    Page Fade Transition
------------------------------------*/

document.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    if(
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:")
    ){

        link.addEventListener("click", function(e){

            e.preventDefault();

            document.body.classList.add("fade-out");

            setTimeout(()=>{

                window.location.href = href;

            },500);

        });

    }

});


/*------------------------------------
    Reveal Animation
------------------------------------*/

const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll(){

    revealItems.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/*------------------------------------
    Scroll Indicator
------------------------------------*/

const indicator = document.querySelector(".scroll-indicator");

if(indicator){

    indicator.addEventListener("click", ()=>{

        const mission = document.getElementById("mission");

        if(mission){

            mission.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

// ======================================
// Cinematic Smooth Scroll
// ======================================

let scrollAnimation = null;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function smoothScroll(target, duration = 3500) {

    return new Promise(resolve => {

        if (!target) {
            resolve();
            return;
        }

        // Stop previous animation
        if (scrollAnimation) {
            cancelAnimationFrame(scrollAnimation);
            scrollAnimation = null;
        }

        // Disable CSS smooth scrolling while animating
        document.documentElement.style.scrollBehavior = "auto";

        const startY = window.pageYOffset;
        const endY = target.offsetTop;
        const distance = endY - startY;

        let startTime = null;

        function animate(time) {

            if (!startTime) startTime = time;

            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease In Out Cubic
            const eased =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {

                scrollAnimation = requestAnimationFrame(animate);

            } else {

                window.scrollTo(0, endY);

                scrollAnimation = null;

                // Restore CSS smooth scrolling
                document.documentElement.style.scrollBehavior = "";

                resolve();

            }

        }

        scrollAnimation = requestAnimationFrame(animate);

    });

}

/*------------------------------------
    Automatic Homepage Presentation
------------------------------------*/

const home = document.querySelector(".hero");
const mission = document.querySelector(".mission-panel");
const vision = document.querySelector(".vision-panel");

const HOME_TIME = 8000;
const SECTION_TIME = 12000;

async function presentationLoop() {

    if (presentationRunning) return;

    presentationRunning = true;

    while (true) {

        console.log("HOME");

        window.scrollTo(0, home.offsetTop);

        if (window.resetEarthZoom) window.resetEarthZoom();
        if (window.startEarthZoom) window.startEarthZoom();

        await wait(HOME_TIME);

        console.log("MISSION");

        await smoothScroll(mission);

        await wait(SECTION_TIME);

        console.log("VISION");

        await smoothScroll(vision);

        await wait(SECTION_TIME);

        console.log("BACK HOME");

        await smoothScroll(home);

        if (window.resetEarthZoom) window.resetEarthZoom();

        await wait(HOME_TIME);
    }
}

/*------------------------------------
    Hamburger Menu
------------------------------------*/

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger && navLinks){

    hamburger.addEventListener("click", ()=>{

        hamburger.classList.toggle("active");

        navLinks.classList.toggle("active");

    });

}

/*=====================================================
    END OF FILE
=====================================================*/