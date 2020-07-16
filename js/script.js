let state = {
    idOfItem: 0,
    currentRating: null,
    listOfRates: ['rate-1', 'rate-2', 'rate-3', 'rate-4', 'rate-5'],
    currentColor: 'green',
    listOfColors: ['green', 'yellow'],
    currentTab: 'pickup',
    listOfTabs: ['pickup', 'deliver'],
    currentPickupTab: 'pickup-1',
    currentDeliverTab: 'deliver-1',
    items: [{
            id: 0,
            name: 'Рюкзак PUMA',
            price: 5000,
            color: 'Зеленый',
            img: 'https://i.imgur.com/efVDJYw.png',
            count: 1,
        },
        {
            id: 1,
            name: 'Рюкзак PUMA',
            price: 5000,
            color: 'Желтый',
            img: 'https://i.imgur.com/BCclRH4.png',
            count: 1,
        },
    ],
    cart: [],
    favorite: []
};

let setState = (key, value = null) => {
    if (state.hasOwnProperty(key)) {
        state[key] = value;
    } else {
        console.error(`State with key '${key}' doesn't exist.`)
    }
};

let changer = (findByClass, operationClass, conditionState) => {
    let arrayOfEls = document.getElementsByClassName(findByClass);
    for (let i = 0; i < arrayOfEls.length; i++) {
        if (arrayOfEls[i].className.includes(operationClass) && !arrayOfEls[i].className.includes(
                conditionState)) {
            arrayOfEls[i].classList.remove(operationClass);
        } else if (arrayOfEls[i].className.includes(conditionState)) {
            arrayOfEls[i].classList.add(operationClass);
        }
    }
};

let twoConditionChanger = (findByClass, operationClass, conditionState, secondCondition) => {
    let arrayOfEls = document.getElementsByClassName(findByClass);
    for (let i = 0; i < arrayOfEls.length; i++) {
        if (arrayOfEls[i].className.includes(operationClass) &&
            arrayOfEls[i].className.includes(secondCondition) &&
            !arrayOfEls[i].className.includes(conditionState)) {
            arrayOfEls[i].classList.remove(operationClass);
        } else if (arrayOfEls[i].className.includes(conditionState) && arrayOfEls[i].className.includes(
                secondCondition)) {
            arrayOfEls[i].classList.add(operationClass);
        }
    }
};

let onRadioChanger = (findByName, state, callback) => {
    let rad = document.getElementsByName(findByName);
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].type == "radio" && rad[i].checked) {
            setState(state, rad[i].value);
        }
        rad[i].addEventListener('change', function () {
            setState(state, this.value);
            callback();
        });
    }
};

let modalOnClick = (modal, btn) => {
    let span = modal.children[0].children[0];
    let animation = () => {
        modal.classList.remove('fadein');
        modal.children[0].classList.remove('fadein-content')
        modal.children[0].classList.add('fadeout-content')
        modal.classList.add('fadeout');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fadeout');
            modal.children[0].classList.remove('fadeout-content')
            modal.children[0].classList.add('fadein-content')
            modal.classList.add('fadein');
        }, 1000);
    };

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    span.addEventListener("click", () => {
        animation();
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            animation();
        }
    });
};

let validateField = (el, regExp, idOfSubEl, text) => {
    let reg = regExp;

    if (reg.test(el.value) == false) {
        document.getElementById(idOfSubEl).innerHTML = text;
        return false;
    }
    document.getElementById(idOfSubEl).innerHTML = "";
    return true;

};

// Rating
state.listOfRates.forEach((element) => {
    document.getElementById(element).addEventListener('click', () => {
        let cls = document.getElementById(element).className;
        switch (element) {
            case 'rate-1':
                setState('currentRating', 1);
                break;

            case 'rate-2':
                setState('currentRating', 2);
                break;

            case 'rate-3':
                setState('currentRating', 3);
                break;

            case 'rate-4':
                setState('currentRating', 4);
                break;

            case 'rate-5':
                setState('currentRating', 5);
                break;
        }

        for (let i = 0; i < state.currentRating; i++) {
            if (cls.includes('unchecked')) {
                document.getElementById(state.listOfRates[i]).classList.remove('unchecked');
                document.getElementById(state.listOfRates[i]).classList.remove('fa-star-o');
                document.getElementById(state.listOfRates[i]).classList.add('fa-star');
                document.getElementById(state.listOfRates[i]).classList.add('checked');
            } else {
                for (let i = state.currentRating; i < state.listOfRates.length; i++) {
                    document.getElementById(state.listOfRates[i]).classList.remove('checked');
                    document.getElementById(state.listOfRates[i]).classList.remove('fa-star');
                    document.getElementById(state.listOfRates[i]).classList.add('fa-star-o');
                    document.getElementById(state.listOfRates[i]).classList.add('unchecked');
                }
            }
        };
    });
});

// Slider
$(document).ready(function () {
    $('.slider').slick();

    for (let i = 0; i < state.listOfColors.length; i++) {
        $(`.${state.listOfColors[i]}`).click(() => {
            $('.slider').slick('slickGoTo', i, false);
            setState('currentColor', state.listOfColors[i]);
            setState('idOfItem', i);
        });
    }

    $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setState('currentColor', state.listOfColors[nextSlide]);
        setState('idOfItem', nextSlide);
        changeColor();
    });
});

// Cart & favorite modal-content start
document.getElementById('modalCartBtn').addEventListener('click', () => {
    generateCartContent();
});

document.getElementById('modalFavoriteBtn').addEventListener('click', () => {
    generateFavContent();
});


let updateCartCounters = () => {
    let cart = document.getElementsByClassName('cart-counter');
    let count = 0;
    state.cart.map(i => count += i.count);
    for (let i = 0; i < cart.length; i++) {
        cart[i].innerHTML = count;
    }
};
updateCartCounters()

let updateFavCounters = () => {
    let fav = document.getElementsByClassName('favorite-counter');
    let count = state.favorite.length;
    for (let i = 0; i < fav.length; i++) {
        fav[i].innerHTML = count;
    }
};
updateFavCounters()

let generateFavContent = () => {
    $('.remove').remove();
    if (state.favorite.length) {
        state.favorite.map((i) => {
            $('#favorite-content').append(
                `<div class="remove row">
                    <img class="col" src="${i.img}" width="100px" alt="${i.color}" />
                    <div class="cart-item"> Цена: ${i.price} </div>
                    <div class="cart-item"> Наименование: ${i.name} </div>
                    <div class="cart-item">
                        <i class="fa fa-trash-o --pointer" onclick="delItmFav(${i.id})" aria-hidden="true"></i>
                    </div>
                </div>`
            );
        });
    } else {
        $('#favorite-content').append(
            `<div class="remove row">
                    <div class="cart-item"> Нет избранных товаров. </div>
            </div>`
        );
    }
    updateFavCounters()
};


let generateCartContent = () => {
    $('._remove').remove();
    if (state.cart.length) {
        state.cart.map((i) => {
            $('#cart-content').append(
                `<div class="_remove row">
                    <img class="col" src="${i.img}" width="100px" alt="${i.color}" />
                    <div class="cart-item"> Цена: ${i.price} </div>
                    <div class="cart-item"> Наименование: ${i.name} </div>
                    <div class="cart-item">
                        <i class="fa fa-plus --pointer" onclick="addItmCart(${i.id})" aria-hidden="true"></i>
                            Кол-во: ${i.count} 
                        <i class="fa fa-minus --pointer" onclick="delItmCart(${i.id})" aria-hidden="true"></i>
                    </div>
                </div>`
            );
        });
    } else {
        $('#cart-content').append(
            `<div class="_remove row">
                    <div class="cart-item"> Корзина пуста. </div>
            </div>`
        );
    }
    updateCartCounters()
};

let addItmCart = (id) => {
    state.cart.find(i => i.id == id).count++
    generateCartContent();
};

let delItmCart = (id) => {
    if (state.cart.find(i => i.id == id).count > 1) {
        state.cart.find(i => i.id == id).count--
    } else {
        setState('cart', state.cart.filter(i => i.count > 1))
    }
    generateCartContent();
};

let delItmFav = (id) => {
    if (state.favorite.find(i => i.id == id)) {
        setState('favorite', state.favorite.filter(i => i.id != id))
        console.log(state.favorite)
    }
    generateFavContent();
};

let cleanCart = () => {
    document.getElementById('clean-cart').addEventListener('click', () => {
        state.items = state.items.map(i => ({
            ...i,
            count: 0
        }))
        state.cart = [];
        generateCartContent();
    });
};

let cleanFav = () => {
    document.getElementById('clean-favorite').addEventListener('click', () => {
        state.favorite = [];
        generateFavContent();
    });
};

let addItemToCart = () => {

    $('.add-to-cart').on('click', () => {
        if (state.cart.find(i => i.id == state.idOfItem)) {
            state.cart.find(i => i.id == state.idOfItem).count++
        } else {
            setState('cart', [...state.cart, state.items.find(i => i.id == state.idOfItem)]);
        }
        updateCartCounters()
    })
};

let addItemToFav = () => {
    $('.add-to-favorite').on('click', () => {
        if (!state.favorite.find(i => i.id == state.idOfItem)) {
            setState('favorite', [...state.favorite, state.items.find(i => i.id == state
                .idOfItem)]);
        }
        updateFavCounters()
    })
};
// Cart & favorite modal-content end

let modalSignIn = () => {
    modalOnClick(document.getElementById('modalSignIn'), document.getElementById('modalSignInBtn'))
};

let modalCart = () => {
    modalOnClick(document.getElementById('modalCart'), document.getElementById('modalCartBtn'))
};

let modalFavorite = () => {
    modalOnClick(document.getElementById('modalFavorite'), document.getElementById('modalFavoriteBtn'))
};


let validateEmail = () => {
    validateField(document.getElementById('email'),
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        'email-valid',
        'Введите валидный E-mail');
};

let validatePhone = () => {
    validateField(document.getElementById('phone'),
        /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/,
        'phone-valid',
        'Введите валидный телефон');
};

let validation = () => {
    document.getElementById('sign-in-button').addEventListener('click', () => {
        validateEmail(document.getElementById('email'))
        validatePhone(document.getElementById('phone'))
    })
};

let onChangeTab = () => onRadioChanger('delivery', 'currentTab', changeTab);
let onChangeTabPickup = () => onRadioChanger('pickup', 'currentPickupTab', changePickupTab);
let onChangeTabDeliver = () => onRadioChanger('deliver', 'currentDeliverTab', changeDeliverTab);

let changeColor = () => changer('choose-color', 'active', state.currentColor);
let changeTab = () => changer('tabs-panel', 'active-tab', state.currentTab);
let changeDeliverTab = () => twoConditionChanger('tab-element', 'active', state.currentDeliverTab,
    'deliver');
let changePickupTab = () => twoConditionChanger('tab-element', 'active', state.currentPickupTab,
    'pickup');

changeColor();

onChangeTab();
changeTab();
onChangeTabPickup();
onChangeTabDeliver();
changeDeliverTab();
changePickupTab();

modalSignIn();
modalCart();
modalFavorite();

validation();

addItemToCart();
cleanCart();

addItemToFav();
cleanFav();