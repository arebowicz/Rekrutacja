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
        const sectionTop = current.offsetTop - 80;  // 80 is height (in 'px') of header + some margin offset
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

// the same rule as in above case

document.querySelector('#ingredients .section-content').addEventListener('mouseover', (event) => {
    if (document.documentElement.clientWidth >= 768) {
        let item = event.target.closest('.ingredients-item');
        if (item) {
            item.querySelector('h4').style.textDecorationColor = 'black';
        }
    }
});

document.querySelector('#ingredients .section-content').addEventListener('mouseout', (event) => {
    if (document.documentElement.clientWidth >= 768) {
        let item = event.target.closest('.ingredients-item');
        if (item) {
            item.querySelector('h4').style.textDecorationColor = 'transparent';
        }
    }
});

document.querySelector('#dropdown-button').addEventListener('click', (event) => {
    if (document.querySelector('#dropdown-items').classList[0] == 'hide-dropdown') {
        document.querySelector('#dropdown-button img').src = 'images/icons/X-dropdown-icon.png';
    } else {
        document.querySelector('#dropdown-button img').src = 'images/icons/dropdown-icon.png'
    }
    document.querySelector('#dropdown-items').classList.toggle('show-dropdown');
    document.querySelector('#dropdown-items').classList.toggle('hide-dropdown');
});

let pageSize = 8;
let pageNumber = 1;

document.querySelector('#dropdown-items').addEventListener('click', (event) => {
    // note: it's possible to click on container
    if (event.target.id == 'dropdown-item1'
        || event.target.id == 'dropdown-item2'
        || event.target.id == 'dropdown-item3') {
            pageSize = Number(event.target.dataset.value);
        document.querySelector('#dropdown-button img').src = 'images/icons/dropdown-icon.png'
        document.querySelector('#dropdown-items').classList.toggle('show-dropdown');
        document.querySelector('#dropdown-items').classList.toggle('hide-dropdown');
        document.querySelector('#dropdown-button').replaceChild(document.createTextNode(`${pageSize} `), document.querySelector('#dropdown-button').childNodes[0]);
        document.querySelector('#products .section-content').replaceChildren();
        pageNumber = 1;
        fetchData();
    }
});

let isFetching = false;

function fetchData() {
    if (isFetching) {
        return;
    }
    isFetching = true;
    const timeoutId = setTimeout(() => {
        console.error('The fetch request timed out');
        // display a timeout message to the user
        let timeoutErr = document.createElement('h3');
        timeoutErr.appendChild(document.createTextNode('Problem z wczytaniem danych. Spróbuj ponownie później lub skontaktuj się z administratorem.'));
        document.querySelector('#products .section-content').appendChild(timeoutErr);
        isFetching = false;
    }, 5000);
    fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            clearTimeout(timeoutId);
            // process the data and update webpage
            if (pageNumber <= data.totalPages) {
                const productsSectionContent = document.querySelector('#products .section-content');
                if (pageNumber > 1) {
                    productsSectionContent.appendChild(document.createElement('hr'));
                    let pageNumberH3 = document.createElement('h3');
                    pageNumberH3.appendChild(document.createTextNode(`Strona ${pageNumber}:`));
                    productsSectionContent.appendChild(pageNumberH3);
                }
                let productsWrapper = document.createElement('div');
                productsWrapper.classList.add('products-wrapper');
                data.data.forEach((item) => {
                    let current = document.createElement('div');
                    current.classList.add('product');
                    current.dataset.id = item.id;
                    current.dataset.text = item.text;
                    current.appendChild(document.createTextNode(`ID: ${item.id}`));
                    productsWrapper.appendChild(current);
                });
                productsSectionContent.appendChild(productsWrapper);
                if (pageNumber == data.totalPages) {
                    let endOfPages = document.createElement('h3');
                    endOfPages.appendChild(document.createTextNode('Wczytano wszystkie strony'));
                    productsSectionContent.appendChild(endOfPages);
                }
                pageNumber++;
            }
            isFetching = false;
        })
        .catch(error => {
            // display error message to the user
            let err = document.createElement('h3');
            err.appendChild(document.createTextNode('Problem z API. Spróbuj ponownie później lub skontaktuj się z administratorem.'));
            document.querySelector('#products .section-content').appendChild(err);
            isFetching = false;
        });
}

window.addEventListener('scroll', (event) => {
    const productsSection = document.querySelector('#products');
    if (productsSection.getBoundingClientRect().top <= window.innerHeight) {
        if (pageNumber == 1) {
            fetchData();
        } else {
            const lastElWrapper = document.querySelectorAll('#products .products-wrapper');
            const elWrapperChildren = lastElWrapper[lastElWrapper.length - 1].children;
            const lastEl = elWrapperChildren[elWrapperChildren.length - 1];
            if (lastEl.getBoundingClientRect().top <= window.innerHeight) {
                fetchData();
            }
        }
    }
});

document.querySelector('#products .section-content').addEventListener('click', (event) => {
    if (event.target.classList.contains('product')) {
        document.querySelector('#product-popup').classList.toggle('popup-active');
        document.querySelector('body').classList.toggle('noscroll');
        let newId = document.createTextNode(event.target.dataset.id);
        document.querySelector('#inject-popup-id').replaceChildren();
        document.querySelector('#inject-popup-id').appendChild(newId);
    }
});

document.querySelector('#product-popup .popup-close').addEventListener('click', (event) => {
    document.querySelector('#product-popup').classList.toggle('popup-active');
    document.querySelector('body').classList.toggle('noscroll');
});