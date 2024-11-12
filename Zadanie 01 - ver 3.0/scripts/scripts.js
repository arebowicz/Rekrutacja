function menuAction() {
    document.querySelectorAll('#nav-icon > .line').forEach(line => line.classList.toggle('toggle-icon'));
    document.querySelector('nav > ul').classList.toggle('show-nav');
    document.querySelector('#menu-open-white-bg').classList.toggle('stretch-white-bg');
    document.querySelector('#menu-open-white-logo').classList.toggle('stretch-white-logo');
    document.querySelector('body').classList.toggle('noscroll');
}

document.querySelector('#nav-icon').addEventListener('click', (e) => {
    menuAction();
});

let lowerThan768 = true;

if (document.documentElement.clientWidth >= 768) {
    lowerThan768 = false;
}

window.addEventListener('resize', (e) => {
    if (document.documentElement.clientWidth >= 768 && lowerThan768) {
        lowerThan768 = false;
        if (document.querySelector('nav > ul').classList.contains('show-nav')) {
            // close the menu:
            menuAction();
        }
    } else if (document.documentElement.clientWidth < 768 && !lowerThan768) {
        lowerThan768 = true;
    }
});

document.querySelector('nav > ul').addEventListener('click', (event) => {
    if (document.documentElement.clientWidth < 768 && event.target.tagName == 'A') {
        // close the menu:
        menuAction();
    }
});

const sections = document.querySelectorAll(".body-wrapper > section");

// special thanks to: https://codepen.io/dbilanoski/pen/LabpzG
window.addEventListener('scroll', (e) => {
    let scrollY = window.scrollY;
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 70;  // 70 is ~ height (in 'px') of header
        const sectionId = current.getAttribute("id");
        if ((scrollY > sectionTop) && (scrollY <= sectionTop + sectionHeight)) {
            document.querySelector("#nav-" + sectionId + "-item").classList.add("active");
        } else {
            document.querySelector("#nav-" + sectionId + "-item").classList.remove("active");
        }
    });
});

// code from below (mouseover and mouseout events) is working but it's a bit tricky:
// when user moves cursor over our #stand-out .section-content
// firstly opacity is changing to '0'
// but immediately after that opacity is (eventually) changing to '1'
// and it's happening really fast
// so style of .stand-out-underline is in fact changing only when necessary

document.querySelector('#stand-out .section-content').addEventListener('mouseover', (event) => {
    if (document.documentElement.clientWidth >= 768) {
        if (event.target.closest('.stand-out-innovative')) {
            document.querySelector('.stand-out-img.stand-out-innovative .stand-out-underline').style.opacity = '1';
        } else if (event.target.closest('.stand-out-comfort')) {
            document.querySelector('.stand-out-img.stand-out-comfort .stand-out-underline').style.opacity = '1';
        } else if (event.target.closest('.stand-out-efficiency')) {
            document.querySelector('.stand-out-img.stand-out-efficiency .stand-out-underline').style.opacity = '1';
        }
    }
});

document.querySelector('#stand-out .section-content').addEventListener('mouseout', (event) => {
    if (document.documentElement.clientWidth >= 768) {
        if (event.target.closest('.stand-out-innovative')) {
            document.querySelector('.stand-out-img.stand-out-innovative .stand-out-underline').style.opacity = '0';
        } else if (event.target.closest('.stand-out-comfort')) {
            document.querySelector('.stand-out-img.stand-out-comfort .stand-out-underline').style.opacity = '0';
        } else if (event.target.closest('.stand-out-efficiency')) {
            document.querySelector('.stand-out-img.stand-out-efficiency .stand-out-underline').style.opacity = '0';
        }
    }
});