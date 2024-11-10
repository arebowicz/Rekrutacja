document.querySelector('#nav-icon').addEventListener('click', (e) => {
    document.querySelectorAll('#nav-icon > .line').forEach(line => line.classList.toggle('toggle-icon'));
    document.querySelector('nav > ul').classList.toggle('show-nav');
    document.querySelector('#menu-open-white-bg').classList.toggle('stretch-white-bg');
    document.querySelector('#menu-open-white-logo').classList.toggle('stretch-white-logo');
    document.querySelector('body').classList.toggle('noscroll');
});

let lowerThan768 = true;

if (document.documentElement.clientWidth >= 768) {
    lowerThan768 = false;
}

window.addEventListener('resize', (e) => {
    if (document.documentElement.clientWidth >= 768 && lowerThan768) {
        lowerThan768 = false;
        if (document.querySelector('nav > ul').classList.contains('show-nav')) {
            document.querySelectorAll('#nav-icon > .line').forEach(line => line.classList.toggle('toggle-icon'));
            document.querySelector('nav > ul').classList.toggle('show-nav');
            document.querySelector('#menu-open-white-bg').classList.toggle('stretch-white-bg');
            document.querySelector('#menu-open-white-logo').classList.toggle('stretch-white-logo');
            document.querySelector('body').classList.toggle('noscroll');
        }
    } else if (document.documentElement.clientWidth < 768 && !lowerThan768) {
        lowerThan768 = true;
    }
});