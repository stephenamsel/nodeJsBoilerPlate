// Uncomment lines for tools used by the server

// import { Mailsender, Mailreciever } from "../configs/mailer.js"; export { Mailsender, Mailreciever }; //Email
// import { MongooseClient, startMongoose } from "../configs/mongoose.js"; export { MongooseClient }; startMongoose(MongooseClient); //MongoDB
// import { ActiveClient, PrismaBaseClass } from "../configs/prismaArSetup.js"; export { ActiveClient, PrismaBaseClass }; // SQL DB - Prisma ORM
// import { RedisClient } from "../configs/redis.js"; export { RedisClient } // Redis
// import { WsIO, startWS } from "../configs/socket.js"; startWS(WsIO); export { WsIO } // Websocket