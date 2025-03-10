export const client = require('mongoose');

// Set up connection for Document DB
let username = process.env("MONGO_USERNAME");
let password = process.env("MONGO_PW");
let url = process.env("MONGO_URL") ??= "127.0.0.1";
let port = process.env("MONGO_PORT") ??= "27017";
let db = process.env("MONGO_DB");

let user_info = ''
if(typeof(username) != 'undefined' && typeof(password) != 'undefined'){
    user_info = `${username}:${password}@`
}
client.connect(`mongodb://${user_info}${url}:${port}/${db}`);