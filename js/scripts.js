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
     showUsersOnPage(userArray);

 }

/** 
 * create HTML markup for card
 * @param {object} user object from API
*/
function createCard(user) {
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
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

getUsers();

