// users.js

// This object will hold all your user data.
// You can consider this your "user database" for the frontend.
const verifiedUsers = {
    '0001': {
        name: 'Maro Erubasa Akpovwovwo',
        picture: 'https://i.imgur.com/1CpTG5U.jpeg',
        age: 28,
        country: 'Nigeria',
        state_province: 'Delta',
        city: 'Sapele',
        sexuality: 'Gay',
        body_type: 'Athletic',
        height: 179,
        interested_in: 'Someone who is tall, silm, handsome, and enjoys being their true self and love art.',
        is_verified: true
    },
    '5678': {
        name: 'Kwame Adjei',
        picture: 'https://via.placeholder.com/120/6A5ACD/000000?text=KA',
        age: 34,
        country: 'Ghana',
        state_province: 'Greater Accra',
        city: 'Accra',
        sexuality: 'Bisexual',
        body_type: 'Bear',
        height: 180,
        interested_in: 'A partner for deep conversations, who loves good food and exploring new tech.',
        is_verified: true
    },
    '9012': {
        name: 'Thabo Mkhize',
        picture: 'https://via.placeholder.com/120/8A2BE2/FFFFFF?text=TM',
        age: 25,
        country: 'South Africa',
        state_province: 'Western Cape',
        city: 'Cape Town',
        sexuality: 'Lesbian',
        body_type: 'Slim',
        height: 165,
        interested_in: 'Creative and open-minded individuals who appreciate art and culture.',
        is_verified: true
    },
     '3456': {
        name: 'Ahmed Bello',
        picture: 'https://via.placeholder.com/120/483D8B/FFFFFF?text=AB',
        age: 30,
        country: 'Nigeria',
        state_province: 'FCT',
        city: 'Abuja',
        sexuality: 'Gay',
        body_type: 'Muscular',
        height: 185,
        interested_in: 'Someone who shares a passion for entrepreneurship, travel, and sunsets.',
        is_verified: true
    }
    // ADD OR REMOVE MORE USERS HERE (e.g., add new entry, or delete existing one)
    /* Example of adding a new user:
    ,
    '4321': {
        name: 'New User Example',
        picture: 'https://via.placeholder.com/120/FFD700/000000?text=NU',
        age: 22,
        country: 'Kenya',
        state_province: 'Nairobi County',
        city: 'Nairobi',
        sexuality: 'Queer',
        body_type: 'Average',
        height: 168,
        interested_in: 'Learning new things, music, and social activism.',
        is_verified: true
    }
    */
};

/**
 * Adds a new user to the verifiedUsers object.
 * In a real application, this would interact with a backend database.
 * @param {string} code - The 4-digit unique code for the user.
 * @param {object} userData - An object containing the user's details.
 */
function addUser(code, userData) {
    if (verifiedUsers[code]) {
        console.warn(`User with code ${code} already exists. Use editUser to update.`);
        return false;
    }
    verifiedUsers[code] = { ...userData, is_verified: true };
    console.log(`User ${userData.name} added successfully with code ${code}.`);
    return true;
}

/**
 * Removes a user from the verifiedUsers object.
 * @param {string} code - The 4-digit unique code of the user to remove.
 */
function removeUser(code) {
    if (!verifiedUsers[code]) {
        console.warn(`User with code ${code} not found.`);
        return false;
    }
    delete verifiedUsers[code];
    console.log(`User with code ${code} removed successfully.`);
    return true;
}

/**
 * Edits an existing user's information.
 * @param {string} code - The 4-digit unique code of the user to edit.
 * @param {object} newUserData - An object containing the updated user details.
 */
function editUser(code, newUserData) {
    if (!verifiedUsers[code]) {
        console.warn(`User with code ${code} not found. Cannot edit.`);
        return false;
    }
    // Merge existing data with new data, ensuring is_verified remains true
    verifiedUsers[code] = { ...verifiedUsers[code], ...newUserData, is_verified: true };
    console.log(`User with code ${code} updated successfully.`);
    return true;
}

/**
 * Retrieves user data by code.
 * @param {string} code - The 4-digit unique code.
 * @returns {object|undefined} The user object if found, otherwise undefined.
 */
function getUser(code) {
    return verifiedUsers[code];
}

// Optionally, if you want to expose these functions globally or for other modules
// window.addUser = addUser;
// window.removeUser = removeUser;
// window.editUser = editUser;
// window.getUser = getUser;

// Export the functions and the data if using ES modules
// export { verifiedUsers, addUser, removeUser, editUser, getUser };
