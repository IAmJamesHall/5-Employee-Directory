/*
 * James Hall
 * Team Treehouse Project 5 - APIs
 * Started Jan 9, 2020
 */

/**
 * getUsers()
 * showUsersOnPage()
 * showUserModal()
 * 
 */
let masterUserArray = [];
getUsers()
    .then(data => masterUserArray = data)
    .then(masterUserArray => showUsersOnPage(masterUserArray));
let currentUserArray = [];
createSearchBar();
let currentShownUser;


 /**
  * get users from random user API
  * @return {array} array of user objects
  */
 async function getUsers() {
     const userArray = [];
     for (let i = 0; i < 12; i++) {
        await fetch('https://randomuser.me/api/?nat=us')
            .then(data => data.json())
            .then(data => userArray.push(data.results[0]));
     }
     return userArray;

 }


/** 
 * create HTML markup for card
 * @param {object} user object from API
*/
function createCard(user) {
    const html = `
    <div class="card" id="${user.name.first}-${user.name.last}">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}
        </div>
    </div>`
    return html;
}



/**
 * displays a list of user objects in the gallery
 * @param {array} users 
 */
function showUsersOnPage(users) {
    const $gallery = $('#gallery')
    
    $gallery.empty();
    for (let i = 0; i < users.length; i++) {
        let card = createCard(users[i]);
        $gallery.append(card);
    }
}

/**
 * create a model to show user details
 * @param {object} user
 */
function createModal(user) {
    currentShownUser = user;
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap"> ${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</pp>
                <p class="modal-text cap">${user.location.city}, ${user.location.state}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${extractDate(user.dob.date)}
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn"Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`

        $body = $('body')
        $body.append(html);
        

        const closeBtn = document.querySelector('#modal-close-btn');
        closeBtn.addEventListener('click', removeModal);

        const prevButton = document.querySelector('.modal-prev');
        prevButton.addEventListener('click', viewPrev);

        const nextButton = document.querySelector('.modal-next');
        nextButton.addEventListener('click', viewNext);

        
}


function createSearchBar() {
    const html = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`

    $searchContainer = $('.search-container');
    $searchContainer.append(html);

}

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('keyup', () => {
    showUsersOnPage(searchName(searchInput.value));
})

/**
 * searches a particular user field (i.e. name) for a search phrase
 * @param {string} searchTerm - string to search for
 * @return {array} - users found with search term
 */
function searchName(searchTerm) {
    searchTerm = searchTerm.replace('-', " ");
    const foundName = [];
    searchTerm = searchTerm.toLowerCase();
    for (let i = 0; i < masterUserArray.length; i++) {
        let name = `${masterUserArray[i].name.first} ${masterUserArray[i].name.last}`;
        name = name.toLowerCase();
        if (name.includes(searchTerm)) {
            foundName.push(masterUserArray[i]);
            console.log(masterUserArray[i].name.first);
        }
    }
    return foundName;
}

function findUser(uuid) {
    for (let i = 0; i < masterUserArray.length; i++) {
        if (masterUserArray[i].login.uuid === uuid) {
            return masterUserArray[i];
        }
    }
}

function removeModal() {
    const modal = document.querySelector('.modal-container');
    modal.parentElement.removeChild(modal);
}


function viewNext(e) {
    const thisUser = document.querySelector(`#${currentShownUser.login.uuid}`);
    const nextUser = thisUser.nextElementSibling;
    removeModal();
    createModal(findUser(nextUser.id));
}

function viewPrev() {}


/**
 * returns date as user-friendly string
 * Ex: 1986-09-04T11:37:56.355Z
 * Ex: Sep 04, 1986
 * Ex: 09-04-1986
 * @param {string} dateString - birthday string provided by randomuser.me
 */
function extractDate(dateString) {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const match = dateString.match(regex);
    return `${match[2]}-${match[3]}-${match[1]}`
}



/************************
 * Event Listeners
 */

const gallery = document.querySelector('#gallery');
gallery.addEventListener('click', e => {
    if (e.target.className != "gallery") {
        const card = e.target.closest('.card');
        const user = searchName(card.id)[0];


        $body = $('body')
        const modalHTML = createModal(user);
        $body.append(modalHTML);
    }
});



