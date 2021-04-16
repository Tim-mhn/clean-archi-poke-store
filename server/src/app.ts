import { createExpressServer, Post, useContainer, useExpressServer } from "routing-controllers";
import express from 'express';
import Container from "typedi";


useContainer(Container);

let app = express();



/* Controllers -> important that they are registered after Redis session */
useExpressServer(app, {
    controllers: [__dirname + '/infrastructure/controllers/**/*.ts'] // we specify controllers we want to use
});
app.set("port", process.env.PORT || 4000);





// export our app
export default app;