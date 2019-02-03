const authHelper = require('../utils/authHelper')
const users = [
    {
        id: 0,
        username: 'emcpadden', 
        password: 'password', 
        firstName: 'Ed', 
        lastName:"McPadden", 
        email: 'emcpadden@gmail.com',
        address: {
            street: '44 Gray Street',
            city: 'Shelton',
            state: 'CT',
            zip: '06484'
        },
        roles: [
            'ADMIN',
            'USER'
        ],
        birthday: new Date(1963, 1, 8),
        about: 'Ed is a software engineer'
    },
    {
        id: 1,
        username: 'mmcpadden', 
        password: 'password', 
        firstName: 'Mary', 
        lastName:"McPadden", 
        email: 'marymcpadden@gmail.com',
        address: {
            street: '44 Gray Street',
            city: 'Shelton',
            state: 'CT',
            zip: '06484'
        },
        roles: [
            'ADMIN',
            'USER'
        ],
        birthday: new Date(1967, 11, 23),
        about: ''
    },
    {
        id: 2,
        username: 'gmcpadden', 
        password: 'password', 
        firstName: 'Grace', 
        lastName:"McPadden", 
        email: 'graciemcpadden@gmail.com',
        address: {
            street: '44 Gray Street',
            city: 'Shelton',
            state: 'CT',
            zip: '06484'
        },
        roles: [
            'USER'
        ],
        birthday: new Date(2004, 2, 27),
        about: ''
    },
    {
        id: 3,
        username: 'kmcpadden', 
        password: 'password', 
        firstName: 'Kate', 
        lastName:"McPadden", 
        email: 'mcpadden.kate@gmail.com',
        address: {
            street: '44 Gray Street',
            city: 'Shelton',
            state: 'CT',
            zip: '06484'
        },
        roles: [
            'USER'
        ],
        birthday: new Date(2006, 1, 31),
        about: ''
    },
    {
        id: 4,
        username: 'bsimpson', 
        password: 'password', 
        firstName: 'Bart', 
        lastName:"Simpson", 
        email: 'bart@fox.com',
        address: {
            street: '1 Oak Steet',
            city: 'Springfield',
            state: 'MA',
            zip: '12345'
        },
        roles: [
            'ADMIN',
            'USER'
        ],
        birthday: new Date(2000, 5, 20),
        about: ''
    },
    {
        id: 5,
        username: 'jdoe', 
        password: 'password', 
        firstName: 'Jane', 
        lastName:"Doe", 
        email: 'jane@company.com',
        address: {
            street: '1 Main Street',
            city: 'Anytown',
            state: 'CA',
            zip: '09753'
        },
        roles: [
            'USER'
        ],
        birthday: new Date(1981, 6, 17),
        about: ''
    },
    {
        id: 6,
        username: 'jsmith', 
        password: 'password', 
        firstName: 'John', 
        lastName:"Smith", 
        email: 'john.smith@example.com',
        address: {
            street: '222 Your Street',
            city: 'Some Town',
            state: 'OH',
            zip: '36327'
        },
        roles: [
            'USER'
        ],
        birthday: new Date(1957, 4, 15),
        about: ''
    },
    {
        id: 7,
        username: 'cbrown', 
        password: 'password', 
        firstName: 'Charlie', 
        email: 'charlie@peanuts.net',
        lastName:"Brown", 
        address: {
            street: '3 Lucy Street',
            city: 'Fairview',
            state: 'NC',
            zip: '38262'
        },
        roles: [
            'USER'
        ],
        birthday: new Date(1942, 9, 12),
        about: 'Charlie Brown is a cartoon character'
    }
];

function getUsers() {
    return [...users];
}

function getUserById(id, includePassord) {
    includePassord = !!includePassord;
    var foundUser = null;
    // find the user
    var user = users.find(u => u.id == id);

    // clone the user and remove the password
    if (!!user) {
        foundUser = Object.assign({}, user);
        if(!includePassord) {
            delete foundUser.password;
        }
    }
    return foundUser;
}

function getUserByUsername(username, includePassord) {
    includePassord = !!includePassord;
    var foundUser = null;
    var usernameToFind = username.trim().toLowerCase();
    // find the user
    var user = users.find(u => {
        return u.username.trim().toLowerCase().localeCompare(usernameToFind) === 0;
    });

    // clone the user and remove the password
    if (!!user) {
        foundUser = Object.assign({}, user);
        if(!includePassord) {
            delete foundUser.password;
        }
    }
    return foundUser;
}

function createUserToken(username, password) {
    var token = null;
    // find the user with the specified password
    var user = getUserByUsername(username, true);
    if (!!user) {
        if (user.password == password) {
            token = authHelper.createToken(user)
        }
    }
    return token;
}

function updateUserProfile(userProfile) {
    var updatedUser = null;
    var userToUpdate = users.find(u => u.id == userProfile.id);
    if (userToUpdate) {
        Object.assign(userToUpdate, userProfile);
        updatedUser = Object.assign({}, userToUpdate);
        delete updatedUser.password;

    }
    return updatedUser;
}

function registerUser(user) {
}

module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserByUsername = getUserByUsername;
module.exports.createUserToken = createUserToken;
module.exports.updateUserProfile = updateUserProfile;
module.exports.registerUser = registerUser;