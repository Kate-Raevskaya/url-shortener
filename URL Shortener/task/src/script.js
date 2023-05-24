let userInput = document.getElementById('input-url');
let createButton = document.getElementById('button-create');
let listOfUrl = document.getElementById('list-url');
let errorMessage = document.getElementById('error-message');
let deleteButton = document.getElementById('button-delete');

let urls = [];

class Url {
    constructor(fullUrl) {
        this.click = 0;
        this.randomPart = generateRandomString(5);
        this.fullUrl = fullUrl;
        this.updating = false;
    }

    get shortUrl() {
        return `localhost/${this.randomPart}`;
    }
}

function createNewUrl() {
    let userUrl = userInput.value;
    return new Url(userUrl);
}

function update() {
    listOfUrl.replaceChildren();
    for (let url of urls) {
        displayUrl(url);
    }
}


function checkUrl() {
    let userUrl = userInput.value;
    let patternUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    return patternUrl.test(userUrl);
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function displayUrl(url) {
    let listElement = document.createElement('li');
    listElement.classList.add('list-element');

    let fullUrl = document.createElement('p');
    fullUrl.innerText = ` - ${url.fullUrl}`;
    fullUrl.classList.add('full-url');

    let userEditUrl = document.createElement('input');
    userEditUrl.value = url.randomPart;
    userEditUrl.classList.add('form-control', 'border', 'border-3', 'border-primary', 'w-25', 'd-inline');

    let shortUrl = document.createElement('a');
    shortUrl.setAttribute('href', url.fullUrl);
    shortUrl.setAttribute('target', '_blank');
    shortUrl.setAttribute('rel', 'noopener noreferrer');
    shortUrl.innerText = url.shortUrl;

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('btn', 'btn-primary', 'ms-3');

    // listElement.insertAdjacentElement('afterbegin', shortUrl);
    fullUrl.insertAdjacentElement('afterbegin', shortUrl);
    listElement.insertAdjacentElement('afterbegin', fullUrl);

    // listElement.insertAdjacentElement('beforeend', fullUrl);

    let clickCount = document.createElement('span');
    clickCount.innerText = ` - Clicks: ${url.click} `;
    listElement.insertAdjacentElement('beforeend', clickCount);

    shortUrl.addEventListener('click', () => {
        url.click +=1;
        clickCount.innerText = ` - Clicks: ${url.click} `;
    });

    listElement.insertAdjacentElement('beforeend', editButton);


    editButton.addEventListener('click', () => {
        if (url.updating) {
            url.updating = false;
            editButton.innerText = 'Edit';
            url.randomPart = userEditUrl.value;
            shortUrl.innerText = url.shortUrl;
            fullUrl.replaceChild(shortUrl, userEditUrl);
        } else {
            url.updating = true;
            fullUrl.replaceChild(userEditUrl, shortUrl);
            editButton.innerText = 'Save';
        }
    })

    listOfUrl.appendChild(listElement);
}



createButton.addEventListener('click', () => {
    if (checkUrl()) {
        errorMessage.classList.add('error-visibility');
        let url = createNewUrl();
        urls.push(url);
        displayUrl(url);
    } else {
        errorMessage.classList.remove('error-visibility');
    }
})

deleteButton.addEventListener('click', () => {
    let userUrl = userInput.value;
    if (userUrl === "") {
        urls = [];
    }
    urls = urls.filter(url => userUrl !== url.shortUrl && userUrl !== url.fullUrl);

    update();
})