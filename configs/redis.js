import { createClient } from 'redis';

let username = process.env("REDIS_USERNAME")
let password = process.env("REDIS_PW") 
let url = process.env("REDIS_URL") ??= "localhost"
let port = process.env("REDIS_PORT") ??= "6739"

let user_info = ''
if(typeof(username) != 'undefined' && typeof(password) != 'undefined'){
    user_info = `${username}:${password}@`
}

createClient({
    url: `redis://${user_info}${url}:${port}`
});
