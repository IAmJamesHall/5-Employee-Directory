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

const userArray = getUsers();

 /**
  * get users from random user API
  * @return {array} array of user objects
  */
 async function getUsers() {
     const userArray = [];
     for (let i = 0; i < 12; i++) {
        await fetch('https://randomuser.me/api/')
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
    <div class="card" id="user-card-${user.login.uuid}">
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
    for (let i = 0; i < users.length; i++) {
        let card = createCard(users[i]);
        $gallery.append(card);
    }
}

function createModal(user) {
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap"> ${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</pp>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street}</p>
                <p class="modal-text">Birthday: ${user.dob.date}
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn"Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
}

/**
 * searches a particular user field (i.e. name) for a search phrase
 * @param {string} searchTerm - string to search for
 * @param {string} field which user field to search in
 */
function searchUsers(searchTerm, field) {
    const foundUsers = [];
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i][field] = searchTerm) {
            foundUsers.push(userArray[i]);
        }
    }
    return foundUsers;
}



/************************
 * Event Listeners
 */


showUsersOnPage(userArray);

const gallery = document.querySelector('#gallery');
gallery.addEventListener('click', e => {
    if (e.target.className != "gallery") {
        console.log('we\'ve got it!');
    }
});