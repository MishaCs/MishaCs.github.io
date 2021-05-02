//checkbox filters

for (const checkbox of document.querySelectorAll('.js-checkbox-filter')) {
    checkbox.addEventListener('click', () => {

        if (!checkbox.checked) {
            const checkboxAttr = checkbox.getAttribute('data-name')
            for (const content of document.querySelectorAll('.js-checked-content')) {

                if (content.getAttribute('data-name') == checkboxAttr) {
                    content.classList.add('d-none');

                }
            }
        } else {
            const checkboxAttr = checkbox.getAttribute('data-name')
            for (const content of document.querySelectorAll('.js-checked-content')) {

                if (content.getAttribute('data-name') == checkboxAttr) {
                    content.classList.remove('d-none');

                }
            }
        }
    })
}


//drop-down-list

for (const dropDownList of document.querySelectorAll('.js-drop-down-list')) {
    const dropDownButton = dropDownList.querySelector('.js-drop-down-button');
    const dropDownContent = dropDownList.querySelector('.js-drop-down-content');
    const offsetHeight = dropDownContent.offsetHeight;


    dropDownButton.addEventListener('click', function () {
        dropDownContent.classList.toggle('drop-down-show');
        dropDownButton.classList.toggle('button-rotate');
    });
}


//select category

const selectСategory = document.querySelector('.js-select-category');
const selectContents = document.querySelectorAll('.js-select-content');


if (selectСategory) {
    selectСategory.addEventListener('change', () => {
        for (const selectContent of selectContents) {
            selectContent.classList.remove('d-block');
            if (selectContent.getAttribute('data-name') === selectСategory.value) {
                selectContent.classList.add('d-block');
            }
        }
    })
}


//form validate

const submitBtns = document.querySelectorAll('.js-submit');

for (let submitBtn of submitBtns) {
    submitBtn.addEventListener('click', function () {
        let formSubmit = submitBtn.closest('form');
        let requiredInputs = formSubmit.querySelectorAll('.required-input');
        let requiredCheckbox = formSubmit.querySelector('.required-checkbox');


        if (requiredCheckbox) {
            requiredInputs.forEach((requiredInput) => {
                if (requiredInput.value === '' || !requiredCheckbox.checked) {
                    requiredInput.closest('.input').classList.add('is-error');
                    requiredCheckbox.closest('.input').classList.add('is-error');
                    submitBtn.disabled = "true";
                    return false;
                } else {
                    return true;
                }

            });

            requiredInputs.forEach((requiredInput) => {
                requiredInput.addEventListener('input', () => {
                    submitBtn.disabled = "";
                    if (requiredInput.value !== '') {
                        requiredInput.closest('.input').classList.remove('is-error');
                        requiredCheckbox.closest('.input').classList.remove('is-error');
                    }
                });
            });


            requiredCheckbox.addEventListener('click', () => {
                submitBtn.disabled = "";


                if (requiredCheckbox.checked) {
                    requiredCheckbox.closest('.input').classList.remove('is-error');
                }

            });

        } else {
            requiredInputs.forEach((requiredInput) => {
                if (requiredInput.value === '') {
                    requiredInput.closest('.input').classList.add('is-error');
                    submitBtn.disabled = "true";
                }

            });

            requiredInputs.forEach((requiredInput) => {
                requiredInput.addEventListener('input', () => {
                    submitBtn.disabled = "";
                    if (requiredInput.value !== '') {
                        requiredInput.closest('.input').classList.remove('is-error');
                    }
                });

            });
        }

    });
}


//form send

const ajaxSend = async (formData, formAction) => {
    const fetchResp = await fetch(formAction, {
        method: 'POST',
        body: formData
    });
    if (!fetchResp.ok) {
        throw new Error(`Error url ${url}, status error ${fetchResp.status}`);
    }
    return await fetchResp.text();
};

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formAction = form.getAttribute('action');
        console.log(formAction)


        ajaxSend(formData, formAction)
            .then((response) => {
                console.log(response);
                form.reset();
            })
            .catch((err) => {
                form.reset();
                console.error(err)
            })
    });
});


//mobile menu

for (const menuTitle of document.querySelectorAll('.js-menu-title')) {
    menuTitle.addEventListener('click', function () {
        menuTitle.closest('.js-menu-content').classList.toggle('active');
    });
}

//hamburger 

document.querySelector('.js-hamburger').addEventListener('click', function () {
    document.querySelector('.js-header-mobile-menu').classList.toggle('d-block');
    this.classList.toggle('hamburger-active');
})


//input focus

const inputs = document.querySelectorAll('.input-animate');

for (input of inputs) {
    input.addEventListener('click', function () {
        this.closest('.input').classList.add('focus-input');
    })

    input.addEventListener('input', function () {
        this.closest('.input').classList.add('focus-input');
    })
}




//map

let links = document.querySelectorAll('.js-link');
let tooltip = document.querySelector('.js-map-tooltip');
let map = document.querySelector('.js-map');


for (let link of links) {
    link.addEventListener('mouseover', function (evt) {
        tooltip.classList.remove('d-none');
        tooltip.classList.add('d-block');
        tooltip.style.cssText = `left: ${evt.offsetX}px; top: ${evt.offsetY}px`;
        tooltip.querySelector('.flag').innerHTML = link.getAttribute('data-flag');
        tooltip.querySelector('.map-tooltip__title').innerHTML = this.getAttribute('data-name');
        tooltip.querySelector('.map-tooltip__description').innerHTML = this.getAttribute('data-description');
    });

    link.addEventListener('mouseout', function (evt) {
        tooltip.classList.remove('d-block');
        tooltip.classList.add('d-none');
    });
}



for (mapList of document.querySelectorAll('.js-map-list')) {
    mapList.addEventListener('click', function () {
        for (const link of document.querySelectorAll('.js-link')) {

            if (link.getAttribute('href') === this.getAttribute('data-name')) {
                const linkCoords = getCoords(link);
                const mapCoords = getCoords(map);

                tooltip.classList.remove('d-none');
                tooltip.classList.add('d-block');
                tooltip.style.cssText = `left: ${linkCoords.left - mapCoords.left + linkCoords.widthCenter}px; top: ${linkCoords.top - mapCoords.top + linkCoords.heightCenter}px`;
                tooltip.querySelector('.flag').innerHTML = link.getAttribute('data-flag');
                tooltip.querySelector('.map-tooltip__title').innerHTML = link.getAttribute('data-name');
                tooltip.querySelector('.map-tooltip__description').innerHTML = link.getAttribute('data-description');
            }
        }
    });
}



function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        widthCenter: box.width / 2,
        heightCenter: box.height / 2,
    };
}


//popup

const popup = document.querySelector('.js-popup');
const contentPopup = document.querySelector('.js-content-popup');
const btnPopup = document.querySelectorAll('.js-button-popup');

for (const btnPopup of document.querySelectorAll('.js-button-popup')) {
    btnPopup.addEventListener('click', function () {
        this.closest('.js-popup').classList.remove('d-block');
    })
}


document.addEventListener('click', function (e) {
    const target = e.target;
    const its_content = target == contentPopup || contentPopup.contains(target);

    if (!its_content) {
        popup.classList.remove('d-block');
    }
});

//custom-select
if(document.querySelector('.custom-select')) {
    customSelect('.custom-select');
}


//data-picker

for(let customDate of document.querySelectorAll('.custom-date')) {
    const picker = datepicker(customDate);
}




