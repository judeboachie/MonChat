const moment = require('moment');

// Turns a message from a string into an object with a username, text, and timestamp
function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('h:mm a') // Hour, minutes, and AM/PM
    }
};


module.exports = formatMessage