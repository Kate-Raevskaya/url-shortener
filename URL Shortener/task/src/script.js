let userInput = document.getElementById('input-url');
let createButton = document.getElementById('button-create');
let listOfUrl = document.getElementById('list-url');
let errorMessage = document.getElementById('error-message');
let deleteButton = document.getElementById('button-delete');


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

function createShortUrl() {
    let shortUrl = document.createElement('a');
    let randomString = generateRandomString(5);
    let userUrl = userInput.value;
    // shortUrl.setAttribute('id', 'short-url');
    shortUrl.setAttribute('href', userUrl);
    shortUrl.setAttribute('target', '_blank');
    shortUrl.setAttribute('rel', 'noopener noreferrer');
    shortUrl.innerText = `localhost/${randomString}`;
    let listElement = document.createElement('li');
    listElement.innerText = ` - ${userUrl}`;
    listElement.insertAdjacentElement('afterbegin', shortUrl);
    let clickCount = document.createElement('span');
    let count = 0;
    clickCount.innerText = ` - Click: ${count}`;
    listElement.insertAdjacentElement('beforeend', clickCount);
    shortUrl.addEventListener('click', () => {
        count += 1;
        clickCount.innerText = ` - Clicks: ${count}`;
    });

    return listElement;
}


createButton.addEventListener('click', () => {
    if (checkUrl()) {
        errorMessage.classList.add('error-visibility');
        let url = createShortUrl();
        listOfUrl.appendChild(url);
    } else {
        errorMessage.classList.remove('error-visibility');
    }
})

deleteButton.addEventListener('click', () => {
    let userUrl = userInput.value;
    if (userUrl === "") {
        listOfUrl.replaceChildren();
    }
    for (let listElement of listOfUrl.children) {
        let shortUrl = listElement.querySelector('a');
        let description = (listElement.childNodes[1].nodeValue).substring(3);
        if (userUrl === shortUrl.textContent || userUrl === description) {
            setTimeout(() => {listElement.remove()}, 0)
        }
    }
})