// Nested Routing can be handled within the controllers to maintain modularity, or here for a centralized map


// Imports
// import Router as exampleRouter from "./controllers/exampleController.js"

// If desired, assemble routers here, for example
// parentRouter.use('/parentresource/:parentResourceID/childresources', childResourcesRouter.routes(), childResourcesRouter.allowedMethods() )

//Construct list of top-level routers to be iported by the Koa server
export const Routers = [
    // exampleRouter,
];