const users = [];

// Join the user to the list of users in the room
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);
    return user;
};


// Get the current user
function getCurrentUser(id) {
    return users.find(user => user.id == id);
};


// Remove the user from the list when they leave the chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    //in findIndex doesnt find what you're looking for, it returns a -1
    if(index !== -1) {
        return users.splice(index, 1)[0];
    };
};


// Get all the users in a room
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
};

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};