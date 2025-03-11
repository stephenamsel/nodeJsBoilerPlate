const Router = require('@koa/router');
import {} from "../serverTools"

export const router = new Router();


router.get('/', (ctx, next) =>{
    ctx.status = 200;
    ctx.body = {
        server_name: "Template",
        path: "Root"
    }
    // status and body are aliases for response.status and response.body, from https://koajs.com/
})