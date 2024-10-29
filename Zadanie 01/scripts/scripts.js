window.onload = function () {
    
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



    const DB_NUM_OF_ITEMS = 50;
    let itemsPerPage = 8;
    let pageNumber = 1;

    function replaceValueInDropdown(value) {
        document.querySelector('#dropdown-button').replaceChild(document.createTextNode(`${value} `), document.querySelector('#dropdown-button').childNodes[0]);
        document.querySelector('#dropdown-button').dataset.value = value;
    }

    let resizeOptimalizationGreaterThan1200 = true;
    let resizeOptimalizationGreaterThan500 = true;

    let secondResizeOptimalizationGreaterThan1200 = true;
    let secondResizeOptimalizationGreaterThan500 = true;

    if (document.documentElement.clientWidth < 1200) {
        itemsPerPage = 4;
        replaceValueInDropdown(4);
        resizeOptimalizationGreaterThan1200 = false;
        secondResizeOptimalizationGreaterThan1200 = false;
        if (document.documentElement.clientWidth < 500) {
            resizeOptimalizationGreaterThan500 = false;
            secondResizeOptimalizationGreaterThan500 = false;
        }
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

    const products = document.querySelector('#grid-products-wrapper');

    function modifyPageNumber(pageNumber) {
        document.querySelector('#products-pages-loaded').removeChild(document.querySelector('#products-pages-loaded').childNodes[0]);
        document.querySelector('#products-pages-loaded').appendChild(document.createTextNode(`${pageNumber}`));
    }

    function modifyNumOfPages(numOfPages) {
        document.querySelector('#products-num-of-pages').removeChild(document.querySelector('#products-num-of-pages').childNodes[0]);
        document.querySelector('#products-num-of-pages').appendChild(document.createTextNode(`${numOfPages}`));
    }

    function calcNewPageNumber(newItemsPerPage) {
        let firstItemIndex = (pageNumber - 1) * itemsPerPage + 1;
        itemsPerPage = newItemsPerPage;
        pageNumber = Math.floor(firstItemIndex / newItemsPerPage) + 1;
        modifyPageNumber(pageNumber);
        modifyNumOfPages(Math.floor(DB_NUM_OF_ITEMS / newItemsPerPage) + (DB_NUM_OF_ITEMS % newItemsPerPage ? 1 : 0));
    }

    function styleGridArea(index, row, column) {
        document.querySelector('#grid-products-wrapper').children[index].style.gridArea = `${row} / ${column}`;
    }

    function reloadProducts(newItemsPerPage, ifResizingTable, fromLastPageToTheLeft) {
        if (ifResizingTable) {
            let oldItemsPerPage = itemsPerPage;
            let oldPageNum = pageNumber;
            calcNewPageNumber(newItemsPerPage); // from now: newItemsPerPage == itemsPerPage
            replaceValueInDropdown(itemsPerPage);
            let ifLastPageIsIncomplete = oldPageNum * oldItemsPerPage > DB_NUM_OF_ITEMS ? 1 : 0;
            if (itemsPerPage < oldItemsPerPage) {
                for (let i = oldItemsPerPage - (ifLastPageIsIncomplete * (oldPageNum * oldItemsPerPage - DB_NUM_OF_ITEMS)); i > itemsPerPage; i--) {
                    products.children[i-1].classList.remove('appear-with-opacity');
                    products.children[i-1].classList.add('hide-with-opacity');
                }
                setTimeout(function() { 
                    for (let i = oldItemsPerPage - (ifLastPageIsIncomplete * (oldPageNum * oldItemsPerPage - DB_NUM_OF_ITEMS)); i > itemsPerPage; i--) {
                        // remember to add remove event listener
                        products.removeChild(products.lastChild);
                    }
                    if (itemsPerPage == 2 && document.documentElement.clientWidth >= 1200) {
                        styleGridArea(0, 1, 2);
                        if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                            styleGridArea(1, 1, 3);
                        }
                    }
                 }, 500);
            } else {
                let firstIndex = (oldPageNum - 1) * oldItemsPerPage + 1;
                loadNewProducts(firstIndex, oldItemsPerPage);
                if ((DB_NUM_OF_ITEMS - firstIndex) < 2 && document.documentElement.clientWidth >= 1200) {
                    styleGridArea(0, 1, 2);
                    if (DB_NUM_OF_ITEMS - firstIndex == 1) {
                        styleGridArea(1, 1, 3);
                    }
                }
            }
        } else {    // logic only for changing page of products
            if (fromLastPageToTheLeft) {
                for (let i = 1; i <= (DB_NUM_OF_ITEMS - (pageNumber * itemsPerPage)); i++) {
                    products.children[i-1].classList.remove('appear-with-opacity');
                    products.children[i-1].classList.add('hide-with-opacity');
                }
            } else {
                for (let i = 1; i <= itemsPerPage; i++) {
                    products.children[i-1].classList.remove('appear-with-opacity');
                    products.children[i-1].classList.add('hide-with-opacity');
                }
            }
            setTimeout(function() {
                while (products.firstChild) {
                    // remember to add remove event listener
                    products.removeChild(products.lastChild);
                }
                loadNewProducts((pageNumber - 1) * itemsPerPage + 1, 0);
                if (itemsPerPage == 2 && document.documentElement.clientWidth >= 1200) {
                    styleGridArea(0, 1, 2);
                    if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                        styleGridArea(1, 1, 3);
                    }
                } else if ((DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage)) == 1 && document.documentElement.clientWidth >= 1200) {
                    styleGridArea(0, 1, 2);
                } else if ((DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage)) == 2 && document.documentElement.clientWidth >= 1200) {
                    styleGridArea(0, 1, 2);
                    styleGridArea(1, 1, 3);
                }
            }, 500);
        }
    }

    function twoCenteredGridItemsAssistant(newItemsPerPage) {
        if (itemsPerPage == 2 && document.documentElement.clientWidth >= 1200) {
            if (DB_NUM_OF_ITEMS == 1) {
                styleGridArea(0, 1, 2);
            } else if (DB_NUM_OF_ITEMS == 2) {
                styleGridArea(0, 1, 2);
                styleGridArea(1, 1, 3);
            } else if (DB_NUM_OF_ITEMS > 2) {
                let indexOfPair = (pageNumber - 1) * itemsPerPage + 1;
                let newPageNumber = Math.floor(indexOfPair / newItemsPerPage) + 1;
                let firstIndex = (newPageNumber - 1) * newItemsPerPage + 1;
                let itemsBeforePair = (indexOfPair - firstIndex) % newItemsPerPage;
                let firstItemRow = Math.floor((itemsBeforePair + 1) / 4) + 1;
                let firstItemColumn = itemsBeforePair % 4 + 1;
                styleGridArea(0, firstItemRow, firstItemColumn);
                if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                    styleGridArea(1, firstItemRow, firstItemColumn + 1);
                }
            }
        }
    }

    document.querySelector('#dropdown-items').addEventListener('click', (event) => {
        if (event.target.dataset.value != document.querySelector('#dropdown-button').dataset.value) {
            switch (event.target.id) {
                case 'dropdown-item1':
                    reloadProducts(2, true, false);
                    break;
                case 'dropdown-item2':
                    twoCenteredGridItemsAssistant(4);
                    reloadProducts(4, true, false);
                    break;
                case 'dropdown-item3':
                    twoCenteredGridItemsAssistant(8);
                    reloadProducts(8, true, false);
                    break;
                case 'dropdown-item4':
                    twoCenteredGridItemsAssistant(16);
                    reloadProducts(16, true, false);
                    break;
            }
        }
    });

    let clickableToRight = true;
    let clickableToLeft = true;

    document.querySelector('#pages-left-icon').addEventListener('click', (event) => {
        if (clickableToLeft) {
            clickableToLeft = false;
            if (pageNumber > 1) {
                if (pageNumber * itemsPerPage >= DB_NUM_OF_ITEMS) { // last page
                    modifyPageNumber(--pageNumber);
                    reloadProducts(itemsPerPage, false, true);
                } else {
                    modifyPageNumber(--pageNumber);
                    reloadProducts(itemsPerPage, false, false);
                }
            }
            setTimeout(function() {
                clickableToLeft = true;
            }, 1000);
        }
    });

    document.querySelector('#pages-right-icon').addEventListener('click', (event) => {
        if (clickableToRight) {
            clickableToRight = false;
            let lastPageNum = Math.floor(DB_NUM_OF_ITEMS / itemsPerPage);
            let isPageFull = DB_NUM_OF_ITEMS % itemsPerPage ? 0 : 1;
            if (pageNumber <= lastPageNum - isPageFull) {
                modifyPageNumber(++pageNumber);
                reloadProducts(itemsPerPage, false, false);
            }
            setTimeout(function() {
                clickableToRight = true;
            }, 1000);
        }
    });

    let firstLoaded = false;
    const distance = document.querySelector('#products').getBoundingClientRect().top;

    function createNewGridItem(itemIndex) {
        let newGridItem = document.createElement('div');
        newGridItem.classList.add('grid-products-item');
        newGridItem.setAttribute('data-id', 0);
        newGridItem.setAttribute('data-name', 0);
        newGridItem.setAttribute('data-value', 0);
        newGridItem.appendChild(document.createTextNode(`index: ${itemIndex}`));
        return newGridItem;
    }

    function loadNewProducts(firstIndex, offset) {
        // TODO: better if condition
        let ifLastPageIsIncomplete = pageNumber * itemsPerPage > DB_NUM_OF_ITEMS ? 1 : 0;
        if ((pageNumber * itemsPerPage)  <=  DB_NUM_OF_ITEMS + (ifLastPageIsIncomplete * itemsPerPage)) {
            for (let i = firstIndex - 1; i >= (pageNumber - 1) * itemsPerPage + 1; i--) {
                // what about ifLastPageIsIncomplete? well... it can't happen
                products.insertBefore(createNewGridItem(i), products.firstChild);
            }
            for (let i = firstIndex + offset; i <= pageNumber * itemsPerPage - (ifLastPageIsIncomplete * (pageNumber * itemsPerPage - DB_NUM_OF_ITEMS)); i++) {
                products.appendChild(createNewGridItem(i));
            }
            setTimeout(function() {
                for (let i = 0; i < itemsPerPage - (ifLastPageIsIncomplete * (pageNumber * itemsPerPage - DB_NUM_OF_ITEMS)); i++) {
                    products.children[i].classList.add('appear-with-opacity');
                }
                
            }, 100);
        }
    }

    // I'LL REFACTOR CODE WRITTEN BELOW LATER
    // NOW WORKING, BUT MAYBE IT NEEDS SOME OPTIMALIZATION
    // i'm assuming that one operation on boolean is faster than few operations on integers (so i created variables like resizeOptimalizationGreaterThan1200)
    window.addEventListener('resize', (event) => {
        if (DB_NUM_OF_ITEMS == 1) {
            if (document.documentElement.clientWidth >= 1200) {
                styleGridArea(0, 1, 2);
            } else if (document.documentElement.clientWidth < 1200) {
                styleGridArea(0, 1, 1);
            }
        } else if (DB_NUM_OF_ITEMS == 2) {
            if (document.documentElement.clientWidth >= 1200) {
                styleGridArea(0, 1, 2);
                styleGridArea(1, 1, 3);
            } else if (document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth >= 500) {
                styleGridArea(0, 1, 1);
                styleGridArea(1, 1, 2);
            } else if (document.documentElement.clientWidth < 500) {
                styleGridArea(0, 1, 1);
                styleGridArea(1, 2, 1);
            }
        } else if (!secondResizeOptimalizationGreaterThan1200 && itemsPerPage == 2 && document.documentElement.clientWidth >= 1200) {
            console.log('1200+');
            secondResizeOptimalizationGreaterThan1200 = true;
            secondResizeOptimalizationGreaterThan500 = true;    // necessary when resizing isn't smooth
            styleGridArea(0, 1, 2);
            if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                styleGridArea(1, 1, 3);
            }
        } else if ((secondResizeOptimalizationGreaterThan1200 || !secondResizeOptimalizationGreaterThan500) && itemsPerPage == 2 && document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth >= 500) {
            console.log('500-1200');
            secondResizeOptimalizationGreaterThan1200 = false;
            secondResizeOptimalizationGreaterThan500 = true;
            styleGridArea(0, 1, 1);
            if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                styleGridArea(1, 1, 2);
            }
        } else if (secondResizeOptimalizationGreaterThan500 && itemsPerPage == 2 && document.documentElement.clientWidth < 500) {
            console.log('500-');
            secondResizeOptimalizationGreaterThan1200 = false;  // necessary when resizing isn't smooth
            secondResizeOptimalizationGreaterThan500 = false;
            styleGridArea(0, 1, 1);
            if (document.querySelector('#grid-products-wrapper').children.length == 2) {
                styleGridArea(1, 2, 1);
            }
        }  else if (!resizeOptimalizationGreaterThan1200 && document.documentElement.clientWidth >= 1200) {
            resizeOptimalizationGreaterThan1200 = true;
            resizeOptimalizationGreaterThan500 = true;  // necessary when resizing isn't smooth
            if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 1) {
                styleGridArea(0, 1, 1);
            } else if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 2) {
                styleGridArea(0, 1, 2);
                styleGridArea(1, 1, 3);
            }
        } else if ((resizeOptimalizationGreaterThan1200 || !resizeOptimalizationGreaterThan500) && document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth >= 500) {
            resizeOptimalizationGreaterThan1200 = false;
            resizeOptimalizationGreaterThan500 = true;
            if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 1) {
                styleGridArea(0, 1, 1);
            } else if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 2) {
                styleGridArea(0, 1, 1);
                styleGridArea(1, 1, 2);
            }
        } else if (resizeOptimalizationGreaterThan500 && document.documentElement.clientWidth < 500) {
            resizeOptimalizationGreaterThan1200 = false;    // necessary when resizing isn't smooth
            resizeOptimalizationGreaterThan500 = false;
            if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 1) {
                styleGridArea(0, 1, 1);
            } else if (DB_NUM_OF_ITEMS - ((pageNumber - 1) * itemsPerPage) == 2) {
                styleGridArea(0, 1, 1);
                styleGridArea(1, 2, 1);
            }
        }
    });

    window.addEventListener('scroll', (e) => {
        if (!firstLoaded && (window.scrollY + window.innerHeight >= distance)) {
            firstLoaded = true;
            loadNewProducts(1, 0);
            modifyPageNumber(1);
            modifyNumOfPages(Math.floor(DB_NUM_OF_ITEMS / itemsPerPage) + (DB_NUM_OF_ITEMS % itemsPerPage ? 1 : 0));
            if (DB_NUM_OF_ITEMS == 1 && document.documentElement.clientWidth >= 1200) {
                styleGridArea(0, 1, 2);
            } else if (DB_NUM_OF_ITEMS == 2 && document.documentElement.clientWidth >= 1200) {
                styleGridArea(0, 1, 2);
                styleGridArea(1, 1, 3);
            }
        }
    });

};