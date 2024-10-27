const sections = document.querySelectorAll("#body-wrapper > section");

// special thanks to: https://codepen.io/dbilanoski/pen/LabpzG
function updateActiveSection() {
    let scrollY = window.scrollY;
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;  // 60 is ~ height (in 'px') of header
        const sectionId = current.getAttribute("id");
        if ((scrollY > sectionTop) && (scrollY <= sectionTop + sectionHeight)) {
            document.querySelector("#nav-" + sectionId + "-item").classList.add("active");
          } else {
            document.querySelector("#nav-" + sectionId + "-item").classList.remove("active");
        }
    });
}

window.addEventListener('scroll', updateActiveSection);

document.querySelector('#logo-scroll-to-top').addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

document.querySelector('#nav-stand-out-item').addEventListener('click', () => {
    document.querySelector('#stand-out').scrollIntoView({behavior: "smooth"});
});

document.querySelector('#nav-ingredients-item').addEventListener('click', () => {
    document.querySelector('#ingredients').scrollIntoView({behavior: "smooth"});
});

document.querySelector('#nav-products-item').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({behavior: "smooth"});
});

document.querySelector('#buy-now-button').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({behavior: "smooth"});
});



let lowerThan799 = false;
// let secondLowerThan799 = false;

if (document.documentElement.clientWidth < 799) {
    lowerThan799 = true;
    // secondLowerThan799 = true;
    document.querySelectorAll('.stand-out-img-direct').forEach((img) => {
        img.classList.remove('hide');
    });
    document.querySelector('.section-images').classList.add('hide');
}

function toggleStandOutImagesView() {
    if (document.documentElement.clientWidth < 799 && !lowerThan799) {
        lowerThan799 = true;
        document.querySelectorAll('.stand-out-img-direct').forEach((img) => {
            img.classList.remove('hide');
        });
        document.querySelector('.section-images').classList.add('hide');
    } else if (document.documentElement.clientWidth >= 799 && lowerThan799) {
        lowerThan799 = false;
        document.querySelectorAll('.stand-out-img-direct').forEach((img) => {
            img.classList.add('hide');
        });
        document.querySelector('.section-images').classList.remove('hide');
    }
}

window.addEventListener('resize', toggleStandOutImagesView);



// BELOW CODE NOT WORKING PROPERLY
// (ask someone smarter? or simply try later?)

// if (!secondLowerThan799) {
//     let minHeight = document.querySelector('.section-images .stand-out-item img').height;
//     document.querySelectorAll('.section-images .stand-out-item').forEach((current) => {
//         current.querySelectorAll('img').forEach((singleImg) => {
//             if (singleImg.height < minHeight) {
//                 minHeight = singleImg.height;
//             }
//         });
//     });
//     document.querySelectorAll('.section-images .stand-out-item').forEach((current) => {
//         current.querySelectorAll('img').forEach((singleImg) => {
//             singleImg.style.height = `${minHeight}px`;
//         });
//     });
// }

// function setHeightOfImages() {
//     if (document.documentElement.clientWidth < 799 && !secondLowerThan799) {
//         secondLowerThan799 = true;
//     } else if (document.documentElement.clientWidth >= 799) {
//         secondLowerThan799 = false;
//         let minHeight = document.querySelector('.section-images .stand-out-item img').height;
//         document.querySelectorAll('.section-images .stand-out-item').forEach((current) => {
//             current.querySelectorAll('img').forEach((singleImg) => {
//                 if (singleImg.height < minHeight) {
//                     minHeight = singleImg.height;
//                 }
//             });
//         });
//         document.querySelectorAll('.section-images .stand-out-item').forEach((current) => {
//             current.querySelectorAll('img').forEach((singleImg) => {
//                 singleImg.style.height = `${minHeight}px`;
//             });
//         });
//     }
// }

// window.addEventListener('resize', setHeightOfImages());



function assistFunction1(item, data) {
    if (document.documentElement.clientWidth < 799) {
        item.querySelector('.stand-out-img-direct').classList.remove('unactive-border-bottom');
        item.querySelector('.stand-out-img-direct').classList.add('active-border-bottom');
    }
    else {
        document.querySelectorAll('.section-images .stand-out-item').forEach((i) => {
            if (i.getAttribute('data-data') == data) {
                i.classList.remove('unactive-border-bottom');
                i.classList.add('active-border-bottom');
            }
        });
    }
}

document.querySelector('#stand-out').addEventListener('mouseover', (event) => {
    let item = event.target.closest('.stand-out-item');
    if (item != null) {
        switch (item.dataset.data) {
            case 'innovative':
                assistFunction1(item, 'innovative');
                break;
            case 'comfort':
                assistFunction1(item, 'comfort');
                break;
            case 'efficiency':
                assistFunction1(item, 'efficiency');
                break;
        }
    }
});

function assistFunction2(event, data, alt) {
    // NOTICE: it's safe: https://stackoverflow.com/questions/18507839/order-of-evaluation-in-if-statement-in-javascript
    if (!(event.relatedTarget instanceof HTMLImageElement) || !(event.relatedTarget.alt == alt)) {
        document.querySelectorAll('.section-images .stand-out-item').forEach((i) => {
            if (i.getAttribute('data-data') == data) {
                i.classList.remove('active-border-bottom');
                i.classList.add('unactive-border-bottom');
            }
        });
    }
}

document.querySelectorAll('.stand-out-flex-wrapper .stand-out-item').forEach((item) => {
    item.addEventListener('mouseleave', (event) => {
        if (document.documentElement.clientWidth < 799) {
            event.target.querySelector('.stand-out-img-direct').classList.remove('active-border-bottom');
            event.target.querySelector('.stand-out-img-direct').classList.add('unactive-border-bottom');
        } else {
            switch (event.target.dataset.data) {
                case 'innovative':
                    assistFunction2(event, 'innovative', 'Czarci Pazur');
                    break;
                case 'comfort':
                    assistFunction2(event, 'comfort', 'Pies');
                    break;
                case 'efficiency':
                    assistFunction2(event, 'efficiency', 'Strzykawka');
                    break;
            }
        }
    });
});

function assistFunction3(event, data) {
    // NOTICE: it's safe: https://stackoverflow.com/questions/18507839/order-of-evaluation-in-if-statement-in-javascript
    if (event.relatedTarget && (!event.relatedTarget.classList.contains('stand-out-item') || event.relatedTarget.dataset.data != data)) {
        event.target.classList.remove('active-border-bottom');
        event.target.classList.add('unactive-border-bottom');
    } else if (!event.relatedTarget) {  // case when user 'exit' page with alt+tab
        document.querySelectorAll('.section-images .stand-out-item').forEach((i) => {
            i.classList.remove('active-border-bottom');
            i.classList.add('unactive-border-bottom');
        });
    }
}

document.querySelectorAll('.section-images .stand-out-item').forEach((item) => {
    item.addEventListener('mouseleave', (event) => {
        if (document.documentElement.clientWidth >= 800) {
            switch (event.target.dataset.data) {
                case 'innovative':
                    assistFunction3(event, 'innovative');
                    break;
                case 'comfort':
                    assistFunction3(event, 'comfort');
                    break;
                case 'efficiency':
                    assistFunction3(event, 'efficiency');
                    break;
            }
        }
    });
});



document.querySelectorAll('.ingredients-item').forEach((item) => {
    item.addEventListener('mouseover', (event) => {
        let i = event.target.closest('.ingredients-item').querySelector('.grid-unactive-border-bottom');
        if (i) {
            i.classList.remove('grid-unactive-border-bottom');
            i.classList.add('grid-active-border-bottom');
        }
    });
});

document.querySelectorAll('.ingredients-item').forEach((item) => {
    item.addEventListener('mouseleave', (event) => {
        let i = event.target.querySelector('.grid-active-border-bottom');
        if (i) {
            i.classList.remove('grid-active-border-bottom');
            i.classList.add('grid-unactive-border-bottom');
        }
    });
});



document.querySelector('#buy-now-button2').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({behavior: "smooth"});
});



const DB_NUM_OF_ITEMS = 64;
let itemsPerPage = 8;
let pageNumber = 1;

function replaceDropdownValue(value) {
    document.querySelector('#dropdown-button').replaceChild(document.createTextNode(`${value} `), document.querySelector('#dropdown-button').childNodes[0]);
}

if (document.documentElement.clientWidth < 799) {
    itemsPerPage = 4;
    replaceDropdownValue(4);
}

document.querySelector('#dropdown-button').addEventListener('click', (event) => {
    document.querySelector('#dropdown-items').classList.add('show-dropdown');
    document.querySelector('#dropdown-items').classList.remove('hide-dropdown');
})

document.documentElement.addEventListener('click', (event) => {
    if ( ! (event.target.matches('#dropdown-button') || event.target.matches('#dropdown-button > img'))
         && document.querySelector('#dropdown-items').classList.contains('show-dropdown')) {
        document.querySelector('#dropdown-items').classList.remove('show-dropdown');
        document.querySelector('#dropdown-items').classList.add('hide-dropdown');
    }
});

document.querySelector('#dropdown-items').addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'dropdown-item1':
            itemsPerPage = 2;
            replaceDropdownValue(2);
            break;
        case 'dropdown-item2':
            itemsPerPage = 4;
            replaceDropdownValue(4);
            break;
        case 'dropdown-item3':
            itemsPerPage = 8;
            replaceDropdownValue(8);
            break;
        case 'dropdown-item4':
            itemsPerPage = 16;
            replaceDropdownValue(16);
            break;
    }
});



let firstLoaded = false;
const distance = document.querySelector('#products').getBoundingClientRect().top;
const products = document.querySelector('#flex-products-wrapper');

function loadNewProducts() {
    if (pageNumber * itemsPerPage <= DB_NUM_OF_ITEMS) {
        for (let i = 0; i < itemsPerPage; i++) {
            let newItem = document.createElement('div');
            newItem.classList.add('product-item');
            newItem.setAttribute('data-id', 0);
            newItem.setAttribute('data-name', 0);
            newItem.setAttribute('data-value', 0);
            products.appendChild(newItem);
        }
    }
}

window.addEventListener('scroll', (e) => {
    if (!firstLoaded && (window.scrollY + window.innerHeight >= distance - 100)) {
        firstLoaded = true;
        loadNewProducts();
    }
});