const Koa = require('koa');
import {Routers} from "./routers.js"
import {BeforeActionMiddlewares, AfterActionMiddleWares} from "./middleware"

//const KoaRouter = require('@koa/router');
const app = new Koa();

BeforeActionMiddlewares.forEach((middleware) => app.use(async (createTextChangeRange, next) => middleware()));
Routers.forEach((router) => app.use(router.routes()).use(router.allowedMethods()));
AfterActionMiddleWares.forEach((middleware) => app.use(async (createTextChangeRange, next) => middleware()));

/* 
    We can replace app.listen...; with
        http.createServer(app.callback()).listen(80);
        https.createServer(app.callback()).listen(443);
    to support http and https connections.
*/
app.listen(process.env(API_PORT) || 80); 